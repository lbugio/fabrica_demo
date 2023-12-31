import { Schema, model, models } from "mongoose";

const ProcesoSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
    precio: {
      type: Number,
      trim: true,
      maxlength: [40, "Precio no puede cotener mas de 49 caracteres."],
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

export default models.Proceso || model("Proceso", ProcesoSchema);
