import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type OrderStatus =
  | "pending"
  | "paid"
  | "in_progress"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded";

export interface IOrder extends Document {
  buyer: Types.ObjectId;
  vendor: Types.ObjectId;
  service: Types.ObjectId;
  tierName: string;
  tierPrice: number;
  deliveryDays: number;
  status: OrderStatus;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  notes?: string;
  deliveredAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    tierName: { type: String, required: true },
    tierPrice: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "in_progress", "delivered", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    stripePaymentIntentId: { type: String },
    stripeSessionId: { type: String },
    notes: { type: String },
    deliveredAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

OrderSchema.index({ buyer: 1 });
OrderSchema.index({ vendor: 1 });
OrderSchema.index({ status: 1 });

export const OrderModel: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema);
