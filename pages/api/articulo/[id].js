import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

dbConnect();

export default async function articulosHandler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const articulo = await Articulo.findById(id).populate('componentes.nombre', ['precio', 'unidad']);
        if (!articulo) return res.status(404).json({ msg: "Articulo does not exists" });
        return res.status(200).json(articulo);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}   