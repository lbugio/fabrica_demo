import { Schema, model, models } from "mongoose";

const ArticuloSchema = new Schema(
  {
    numero: {
      type: String,
      required: [true, "El campo numero es requerido"],
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
    tipo: {
      type: String,
      required: [true, "El campo tipo es requerido"],
      trim: true,
      maxlength: [40, "Tipo no puede cotener mas de 49 caracteres."],
    },
    descripcion: {
      type: String,
      required: [true, "El campo descripción es requerido"],
      trim: true,
      maxlength: [40, "La descripción no puede cotener mas de 49 caracteres."],
    },
    linea: {
      type: String,
      required: [true, "El campo linea es requerido"],
      trim: true,
      maxlength: [40, "Linea no puede cotener mas de 49 caracteres."],
    },
    procesos: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Proceso" },
        nombre: { type: String },
        cantidad: { type: Number },
      },
    ],
    telas: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Tela" },
        nombre: { type: String },
        cantidad: { type: Number },
      },
    ],
    avios: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Avio" },
        nombre: { type: String },
        cantidad: { type: Number },
      },
    ],
    diseños: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Diseño" },
        nombre: { type: String },
        cantidad: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Articulo || model("Articulo", ArticuloSchema);
