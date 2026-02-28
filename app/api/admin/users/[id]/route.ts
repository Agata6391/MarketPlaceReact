import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") return apiError("Unauthorized", 401);

  const adminId = (session.user as any).id;
  if (adminId === params.id) return apiError("Cannot delete yourself", 400);

  await connectDB();

  const user = await UserModel.findByIdAndUpdate(
    params.id,
    { $set: { deletedAt: new Date() } },
    { new: true }
  ).select("deletedAt status");

  return apiSuccess(user);
}