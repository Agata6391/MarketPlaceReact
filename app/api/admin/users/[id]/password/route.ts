import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") return apiError("Unauthorized", 401);

  const body = await req.json().catch(() => ({}));
  const password = String(body?.password ?? "");

  if (password.length < 8) return apiError("Password must be at least 8 characters", 400);

  await connectDB();

  const hash = await bcrypt.hash(password, 12);

  await UserModel.findByIdAndUpdate(params.id, {
    $set: { password: hash, provider: "credentials" },
  });

  return apiSuccess({ message: "Password updated" });
}