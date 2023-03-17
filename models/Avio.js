import { Schema, model, models } from "mongoose";

const AvioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
    precio: {
      type: Number,
      required: [true, "El nombre es requerido"],
      trim: true,
      maxlength: [40, "Precio no puede cotener mas de 49 caracteres."],
    },
    unidad: {
      type: String,
      required: [true, "La unidad es requerida"],
      trim: true,
    },
    ultimoPrecio: {
      type: Number,
      trim: true,
      maxlength: [40, "Precio no puede cotener mas de 49 caracteres."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Avio || model("Avio", AvioSchema);