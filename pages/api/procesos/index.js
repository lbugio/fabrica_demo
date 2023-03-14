import { dbConnect } from "utils/mongoose";
import Proceso from "models/Proceso"


dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const procesos = await Proceso.find().sort({nombre:1});
        return res.status(200).json(procesos);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newProceso = new Proceso(body);
        const savedProceso = await newProceso.save();
        return res.status(201).json(savedProceso);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
