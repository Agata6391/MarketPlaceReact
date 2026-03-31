// app/api/favorites/[id]/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { FavoriteModel } from "@/models/Favorite";
import { apiSuccess, apiError } from "@/lib/api-helpers";

// DELETE /api/favorites/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user) return apiError("Unauthorized", 401);
    const user = session.user as any;
    const userId = user.id ?? user.sub;

    await connectDB();

    const fav = await FavoriteModel.findById(id);
    if (!fav) return apiError("No encontrado", 404);
    if (fav.user.toString() !== userId) return apiError("Forbidden", 403);

    await fav.deleteOne();
    return apiSuccess({ deleted: true });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}