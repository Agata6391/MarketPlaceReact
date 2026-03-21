// app/api/favorites/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { FavoriteModel } from "@/models/Favorite";
import { ServiceModel } from "@/models/Service";
import { apiSuccess, apiError } from "@/lib/api-helpers";

// GET /api/favorites
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return apiError("Unauthorized", 401);
    const user   = session.user as any;
    const userId = user.id ?? user.sub;

    await connectDB();
    const favorites = await FavoriteModel.find({ user: userId })
      .populate({ path: "service", select: "title slug thumbnail category tiers rating reviewCount isActive" })
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(favorites);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// POST /api/favorites — agregar
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return apiError("Unauthorized", 401);
    const user   = session.user as any;
    const userId = user.id ?? user.sub;

    const { serviceId } = await req.json();
    if (!serviceId) return apiError("serviceId requerido", 400);

    await connectDB();

    const svc = await ServiceModel.findById(serviceId).lean() as any;
    if (!svc) return apiError("Servicio no encontrado", 404);

    const minPrice = svc.tiers?.length
      ? Math.min(...svc.tiers.map((t: any) => t.price))
      : 0;

    const fav = await FavoriteModel.findOneAndUpdate(
      { user: userId, service: serviceId },
      { user: userId, service: serviceId, priceAtSave: minPrice },
      { upsert: true, new: true }
    );

    return apiSuccess(fav, 201);
  } catch (err: any) {
    if (err.code === 11000) return apiError("Ya está en favoritos", 409);
    return apiError("Internal server error", 500);
  }
}

// DELETE /api/favorites?serviceId=xxx — eliminar por serviceId
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return apiError("Unauthorized", 401);
    const user   = session.user as any;
    const userId = user.id ?? user.sub;

    const serviceId = req.nextUrl.searchParams.get("serviceId");
    if (!serviceId) return apiError("serviceId requerido", 400);

    await connectDB();
    await FavoriteModel.deleteOne({ user: userId, service: serviceId });

    return apiSuccess({ deleted: true });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}
