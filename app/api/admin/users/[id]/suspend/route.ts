import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return apiError("Unauthorized", 401);
  }

  const adminId = (session.user as any).id;
  if (adminId === id) {
    return apiError("Cannot suspend yourself", 400);
  }

  const body = await req.json().catch(() => ({}));
  const action = body?.action as "suspend" | "unsuspend";
  const days = Number(body?.days ?? 7);

  await connectDB();

  if (action === "unsuspend") {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: { status: "active", suspendedUntil: null } },
      { new: true }
    ).select("status suspendedUntil");

    return apiSuccess(user);
  }

  const until = new Date(Date.now() + Math.max(days, 1) * 24 * 60 * 60 * 1000);

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $set: { status: "suspended", suspendedUntil: until } },
    { new: true }
  ).select("status suspendedUntil");

  return apiSuccess(user);
}