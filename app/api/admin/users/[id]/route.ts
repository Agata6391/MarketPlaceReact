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
  const until = body?.until ? new Date(body.until) : null;
  const reason = String(body?.reason ?? "Admin action").slice(0, 200);

  await connectDB();

  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "suspended",
        suspendedUntil: until,
        suspendReason: reason,
      },
    },
    { new: true }
  ).select("status suspendedUntil suspendReason");

  return apiSuccess(user);
}