import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICartItem {
  service: Types.ObjectId;
  tierName: string;
  tierPrice: number;
  deliveryDays: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  tierName: { type: String, required: true },
  tierPrice: { type: Number, required: true },
  deliveryDays: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const CartModel: Model<ICart> =
  mongoose.models.Cart ?? mongoose.model<ICart>("Cart", CartSchema);
