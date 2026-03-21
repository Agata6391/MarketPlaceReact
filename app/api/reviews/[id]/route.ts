// app/api/reviews/[id]/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ReviewModel } from "@/models/Review";
import { ServiceModel } from "@/models/Service";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return apiError("Unauthorized", 401);
    const user = session.user as any;
    if (user.role !== "admin") return apiError("Solo admins pueden eliminar reseñas", 403);

    await connectDB();

    const review = await ReviewModel.findById(params.id);
    if (!review) return apiError("Reseña no encontrada", 404);

    const serviceId = review.service;
    await review.deleteOne();

    // Recalcular rating del servicio
    const remaining = await ReviewModel.find({ service: serviceId });
    const avg = remaining.length > 0
      ? remaining.reduce((s, r) => s + r.rating, 0) / remaining.length
      : 0;

    await ServiceModel.findByIdAndUpdate(serviceId, {
      rating:      Math.round(avg * 10) / 10,
      reviewCount: remaining.length,
    });

    return apiSuccess({ deleted: true });
  } catch (err: any) {
    console.error("[REVIEW DELETE]", err);
    return apiError("Internal server error", 500);
  }
}
