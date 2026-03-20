// models/Order.ts
import mongoose from "mongoose";

const ProgressUpdateSchema = new mongoose.Schema({
  message:    { type: String, required: true },
  author:     { type: String },
  authorRole: { type: String, enum: ["admin", "vendor", "buyer"] },
  createdAt:  { type: Date, default: Date.now },
});

const OrderSchema = new mongoose.Schema(
  {
    buyer:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    tierName:     { type: String, required: true },
    tierPrice:    { type: Number, required: true },
    deliveryDays: { type: Number },

    status: {
      type: String,
      enum: [
        "pending", "paid", "in_progress", "delivered",
        "completed", "cancelled", "refunded",
        "cancellation_requested",   // ← nuevo
      ],
      default: "pending",
    },

    progressUpdates:          [ProgressUpdateSchema],
    notes:                    { type: String },
    cancellationReason:       { type: String },         // motivo que envió el comprador
    statusBeforeCancellation: { type: String },         // para revertir si vendor rechaza

    stripePaymentIntentId: { type: String },
    stripeSessionId:       { type: String },

    deliveredAt:  { type: Date },
    completedAt:  { type: Date },
  },
  { timestamps: true }
);

OrderSchema.index({ buyer: 1,  createdAt: -1 });
OrderSchema.index({ vendor: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ service: 1 });
OrderSchema.index({ stripeSessionId: 1 }, { sparse: true });

export const OrderModel =
  mongoose.models.Order ?? mongoose.model("Order", OrderSchema);
