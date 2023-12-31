import { Schema, model, models } from "mongoose";

const TelaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: [true, "Este valor ya existe"],
      trim: true,
      maxlength: [40, "Nombre no puede cotener mas de 49 caracteres."],
    },
    unidad: {
      type: String,
      required: [true, "La unidad es requerida"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El nombre es requerido"],
      trim: true,
      maxlength: [40, "Precio no puede cotener mas de 49 caracteres."],
    },
    ultimoPrecio: {
      type: Number,
      trim: true,
      maxlength: [40, "Precio no puede cotener mas de 49 caracteres."],
    },
    tipoComponente:{
      type:String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Tela || model("Tela", TelaSchema);
