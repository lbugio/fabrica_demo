import { dbConnect } from "utils/mongoose";
import Diseño from "models/Diseño"


dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const diseños = await Diseño.find();
        return res.status(200).json(diseños);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newDiseño = new Diseño(body);
        const savedDiseño = await newDiseño.save();
        return res.status(201).json(savedDiseño);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
