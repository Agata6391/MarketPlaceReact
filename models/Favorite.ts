// models/Favorite.ts
import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    // Precio en el momento de guardar — para detectar cambios
    priceAtSave: { type: Number },
  },
  { timestamps: true }
);

// Un usuario no puede guardar el mismo servicio dos veces
FavoriteSchema.index({ user: 1, service: 1 }, { unique: true });
FavoriteSchema.index({ user: 1 });

export const FavoriteModel =
  mongoose.models.Favorite ?? mongoose.model("Favorite", FavoriteSchema);
