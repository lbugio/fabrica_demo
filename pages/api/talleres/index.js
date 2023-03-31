import { dbConnect } from "utils/mongoose";
import Taller from "models/Taller"


dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const talleres = await Taller.find().sort({nombre:1});
        return res.status(200).json(talleres);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newTaller = new Taller(body);
        const savedTaller = await newTaller.save();
        return res.status(201).json(savedTaller);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
