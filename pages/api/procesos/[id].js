import { dbConnect } from "utils/mongoose";
import Proceso from "models/Proceso";

dbConnect();

export default async function procesoHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const proceso = await Proceso.findById(id);
        if (!proceso) return res.status(404).json({ msg: "Proceso does not exists" });
        return res.status(200).json(proceso);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const proceso = await Proceso.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!proceso) return res.status(404).json({ msg: "Proceso does not exists" });
          return res.status(200).json(proceso);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedProceso = await Proceso.findByIdAndDelete(id);
        if (!deletedProceso)
          return res.status(404).json({ msg: "Proceso does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}