import { Schema, model, models } from "mongoose";

const ArticuloSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Articulo || model("Articulo", ArticuloSchema);