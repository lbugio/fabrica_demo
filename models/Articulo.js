import { Schema, model, models } from "mongoose";

const ArticuloSchema = new Schema(
  {
    numero: {
      type: Number,
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
      maxlength: [100, "La descripción no puede cotener mas de 100 caracteres."],
    },
    linea: {
      type: String,
      required: [true, "El campo linea es requerido"],
      trim: true,
      maxlength: [40, "Linea no puede cotener mas de 49 caracteres."],
    },
    procesos: [ 
      {
        _id: { type: Schema.Types.ObjectId, ref: "Proceso" },
        cantidad: { type: Number },
      },
    ],
     telas: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Tela" },
        cantidad: { type: Number },
      },
    ],
    avios: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Avio" },
        cantidad: { type: Number },
      },
    ],
    diseños: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Diseño" },
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
