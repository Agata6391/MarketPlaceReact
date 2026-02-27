import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type ServiceCategory =
  | "design"
  | "development"
  | "marketing"
  | "writing"
  | "video"
  | "music"
  | "business"
  | "other";

export interface IServiceTier {
  name: string;            // "Basic" | "Standard" | "Premium"
  description: string;
  price: number;           // In cents for Stripe
  deliveryDays: number;
  features: string[];
}

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  tags: string[];
  tiers: IServiceTier[];
  vendor: Types.ObjectId;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  orderCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TierSchema = new Schema<IServiceTier>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  deliveryDays: { type: Number, required: true, min: 1 },
  features: [{ type: String }],
});

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    category: {
      type: String,
      enum: ["design", "development", "marketing", "writing", "video", "music", "business", "other"],
      required: true,
    },
    tags: [{ type: String, lowercase: true }],
    tiers: [TierSchema],
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String }],
    thumbnail: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Text index for autocomplete search ─────────────────
ServiceSchema.index({ title: "text", description: "text", tags: "text" });
ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ vendor: 1 });

export const ServiceModel: Model<IService> =
  mongoose.models.Service ?? mongoose.model<IService>("Service", ServiceSchema);
