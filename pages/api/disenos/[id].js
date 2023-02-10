import { dbConnect } from "utils/mongoose";
import Diseño from "models/Diseño";

dbConnect();

export default async function diseñosHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const diseño = await Diseño.findById(id);
        if (!diseño) return res.status(404).json({ msg: "Diseño does not exists" });
        return res.status(200).json(diseño);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const diseño = await Diseño.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!diseño) return res.status(404).json({ msg: "Diseño does not exists" });
          return res.status(200).json(diseño);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedDiseño = await Diseño.findByIdAndDelete(id);
        if (!deletedDiseño)
          return res.status(404).json({ msg: "Diseño does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}