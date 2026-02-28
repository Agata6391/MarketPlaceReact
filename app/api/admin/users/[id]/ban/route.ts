import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") return apiError("Unauthorized", 401);

  const adminId = (session.user as any).id;
  if (adminId === params.id) return apiError("Cannot ban yourself", 400);

  const body = await req.json().catch(() => ({}));
  const action = body?.action as "ban" | "unban";
  const reason = String(body?.reason ?? "Admin action").slice(0, 200);

  await connectDB();

  if (action === "unban") {
    const user = await UserModel.findByIdAndUpdate(
      params.id,
      { $set: { status: "active" }, $unset: { banReason: 1, bannedAt: 1 } },
      { new: true }
    ).select("status banReason bannedAt");

    return apiSuccess(user);
  }

  const user = await UserModel.findByIdAndUpdate(
    params.id,
    { $set: { status: "banned", banReason: reason, bannedAt: new Date() } },
    { new: true }
  ).select("status banReason bannedAt");

  return apiSuccess(user);
}