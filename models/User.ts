import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "vendor" | "buyer";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;         // Optional — Google OAuth users have no password
  avatar?: string;
  role: UserRole;
  provider: "credentials" | "google";
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },   // Never returned by default
    avatar: { type: String },
    role: {
      type: String,
      enum: ["admin", "vendor", "buyer"],
      default: "buyer",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    stripeCustomerId: { type: String },
  },
  { timestamps: true }
);

// ── Hash password before save ───────────────────────────
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Instance method: compare passwords ─────────────────
UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const UserModel: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
