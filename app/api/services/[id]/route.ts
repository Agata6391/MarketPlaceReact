import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { ReviewModel } from "@/models/Review";
import { apiSuccess, apiError, apiNotFound } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ── GET /api/services/[id] ──────────────────────────────
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await connectDB();

    const service = await ServiceModel.findById(id)
      .populate("vendor", "name avatar createdAt")
      .lean();

    if (!service) return apiNotFound("Service");

    const reviews = await ReviewModel.find({ service: id })
      .populate("reviewer", "name avatar")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return apiSuccess({ service, reviews });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// ── PUT /api/services/[id] ──────────────────────────────
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const service = await ServiceModel.findById(id);
    if (!service) return apiNotFound("Service");

    const isOwner = service.vendor.toString() === user.id;
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) return apiError("Forbidden", 403);

    const body = await req.json();
    const updated = await ServiceModel.findByIdAndUpdate(id, body, { new: true });

    return apiSuccess(updated);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// ── DELETE /api/services/[id] ───────────────────────────
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const service = await ServiceModel.findById(id);
    if (!service) return apiNotFound("Service");

    const isOwner = service.vendor.toString() === user.id;
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) return apiError("Forbidden", 403);

    await ServiceModel.findByIdAndUpdate(id, { isActive: false });

    return apiSuccess({ message: "Service deactivated" });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}