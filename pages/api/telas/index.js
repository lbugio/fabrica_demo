import { dbConnect } from "utils/mongoose";
import Tela from "models/Tela"


dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const telas = await Tela.find().sort({nombre:1});
        return res.status(200).json(telas); 
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newTela = new Tela(body);
        const savedTela = await newTela.save();
        return res.status(201).json(savedTela);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
