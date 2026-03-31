import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return apiError("Unauthorized", 401);
  }

  await connectDB();

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $unset: { deletedAt: 1 } },
    { new: true }
  ).select("deletedAt status");

  return apiSuccess(user);
}