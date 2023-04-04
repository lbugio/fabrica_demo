import { Schema, model, models } from "mongoose";

const TipoPrendaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
    linea: {
        type: String,
        required: [true, "El nombre es requerido"],
        unique: [true, "Este valor ya existe"],
        trim: true,
        maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.TipoPrenda || model("TipoPrenda", TipoPrendaSchema);