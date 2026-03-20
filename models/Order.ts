// models/Order.ts  — reemplaza el archivo existente
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
    tierPrice:    { type: Number, required: true },  // en centavos
    deliveryDays: { type: Number },

    status: {
      type: String,
      enum: ["pending", "paid", "in_progress", "delivered", "completed", "cancelled", "refunded"],
      default: "pending",
    },

    // Historial de avances — vendor y admin pueden agregar entradas
    progressUpdates: [ProgressUpdateSchema],

    // Nota interna del admin
    notes: { type: String },

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
