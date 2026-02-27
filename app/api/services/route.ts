import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── GET /api/services ────────────────────────────────────
// Supports: ?q=keyword (autocomplete), ?category=design, ?featured=true, ?page=1&limit=12
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "12");
    const vendorId = searchParams.get("vendor");

    const filter: Record<string, any> = { isActive: true };

    // Text search (autocomplete)
    if (q) filter.$text = { $search: q };

    // Category filter — clicking a category card sends this
    if (category) filter.category = category;

    // Featured filter — homepage hero section
    if (featured === "true") filter.isFeatured = true;

    // Vendor-specific listing (vendor dashboard)
    if (vendorId) filter.vendor = vendorId;

    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      ServiceModel.find(filter)
        .populate("vendor", "name avatar")
        .sort(q ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ServiceModel.countDocuments(filter),
    ]);

    return apiSuccess({
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    console.error("[SERVICES GET]", err);
    return apiError("Internal server error", 500);
  }
}

// ── POST /api/services ──────────────────────────────────
// Admin or Vendor only
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    if (user.role !== "admin" && user.role !== "vendor") {
      return apiError("Only vendors and admins can create services", 403);
    }

    await connectDB();

    const body = await req.json();
    const { title, description, shortDescription, category, tags, tiers, images, thumbnail } = body;

    // Auto-generate slug from title
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await ServiceModel.findOne({ slug: baseSlug });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    const service = await ServiceModel.create({
      title,
      slug,
      description,
      shortDescription,
      category,
      tags: tags ?? [],
      tiers,
      vendor: user.id,
      images: images ?? [],
      thumbnail,
      isFeatured: user.role === "admin" ? (body.isFeatured ?? false) : false,
    });

    return apiSuccess(service, 201);
  } catch (err: any) {
    console.error("[SERVICES POST]", err);
    return apiError("Internal server error", 500);
  }
}
