import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  service: Types.ObjectId;
  order: Types.ObjectId;
  reviewer: Types.ObjectId;
  vendor: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minlength: 10, maxlength: 1000 },
  },
  { timestamps: true }
);

// After saving a review, recalculate service rating
ReviewSchema.post("save", async function () {
  const { ServiceModel } = await import("@/models/Service");
  const reviews = await ReviewModel.find({ service: this.service });
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await ServiceModel.findByIdAndUpdate(this.service, {
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  });
});

ReviewSchema.index({ service: 1 });
ReviewSchema.index({ reviewer: 1 });

export const ReviewModel: Model<IReview> =
  mongoose.models.Review ?? mongoose.model<IReview>("Review", ReviewSchema);
