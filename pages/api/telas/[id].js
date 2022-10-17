import { dbConnect } from "utils/mongoose";
import Tela from "models/Tela";

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
        const tela = await Tela.findById(id);
        if (!tela) return res.status(404).json({ msg: "Tela does not exists" });
        return res.status(200).json(tela);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const tela = await Tela.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!tela) return res.status(404).json({ msg: "Tela does not exists" });
          return res.status(200).json(tela);
        } catch (error) {
          return res.status(400).json({ msg: error.message });
        }
    case "DELETE":
      try {
        const deletedTela = await Tela.findByIdAndDelete(id);
        if (!deletedTela)
          return res.status(404).json({ msg: "Tela does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}