import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

dbConnect();

export default async function articulosHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const articulo = await Articulo.findById(id);
        if (!articulo) return res.status(404).json({ msg: "Articulo does not exists" });
        return res.status(200).json(articulo);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const articulo = await Articulo.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!articulo) return res.status(404).json({ msg: "Articulo does not exists" });
          return res.status(200).json(articulo);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedArticulo = await Articulo.findByIdAndDelete(id);
        if (!deletedArticulo)
          return res.status(404).json({ msg: "Articulo does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}