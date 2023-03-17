import { dbConnect } from "utils/mongoose";
import Avio from "models/Avio";

dbConnect();

export default async function aviosHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;
    console.log("🚀 ~ file: [id].js:12 ~ aviosHandler ~ body:", body)

  switch (method) {
    case "GET":
      try {
        const avio = await Avio.findById(id);
        if (!avio) return res.status(404).json({ msg: "Avio does not exists" });
        return res.status(200).json(avio);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const avio = await Avio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!avio) return res.status(404).json({ msg: "Avio does not exists" });
          return res.status(200).json(avio);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedAvio = await Avio.findByIdAndDelete(id);
        if (!deletedAvio)
          return res.status(404).json({ msg: "Avio does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}