import { dbConnect } from "utils/mongoose";
import Avio from "models/Avio"


dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const avios = await Avio.find();
        return res.status(200).json(avios);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newAvio = new Avio(body);
        const savedAvio = await newAvio.save();
        return res.status(201).json(savedAvio);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
