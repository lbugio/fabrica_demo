import { dbConnect } from "utils/mongoose";
import Taller from "models/Taller";

dbConnect();

export default async function telasHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const taller = await Taller.findById(id);
        if (!taller) return res.status(404).json({ msg: "Taller does not exists" });
        return res.status(200).json(taller);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const taller = await Taller.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!taller) return res.status(404).json({ msg: "Taller does not exists" });
          return res.status(200).json(taller);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedTaller = await Taller.findByIdAndDelete(id);
        if (!deletedTaller)
          return res.status(404).json({ msg: "Taller does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}