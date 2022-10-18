import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo"

dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const articulos = await Articulo.find();
        return res.status(200).json(articulos);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      } 
    case "POST":
      try {
        const newArticulo = new Articulo(body);
        const savedArticulo = await newArticulo.save();
        return res.status(201).json(savedArticulo);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }

}
