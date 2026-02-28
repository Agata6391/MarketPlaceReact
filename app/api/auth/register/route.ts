import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return apiError("Name, email and password are required");
    }

    if (password.length < 8) {
      return apiError("Password must be at least 8 characters");
    }

    await connectDB();

    const exists = await UserModel.findOne({ email: email.toLowerCase() });
    if (exists) return apiError("Email already registered", 409);

    // Only allow buyer/vendor roles on self-registration
    // Admin must be created manually or via seed
    const allowedRoles = ["buyer", "vendor"];
    const userRole = allowedRoles.includes(role) ? role : "buyer";

    const user = await UserModel.create({
      name,
      email,
      password, // bcrypt hashing is handled in the model pre-save hook
      role: userRole,
      provider: "credentials",
      status: "active", // NEW
      suspendedUntil: null, // optional
      bannedAt: null, // optional
      banReason: null, // optional
      deletedAt: null, // optional
    });

    return apiSuccess(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      201,
    );
  } catch (err: any) {
    console.error("[REGISTER]", err);
    return apiError("Internal server error", 500);
  }
}
