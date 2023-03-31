import { dbConnect } from "utils/mongoose";
import Diseño from "models/Diseño";
import {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
} from "constants/status";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const diseños = await Diseño.find().sort({nombre:1});
        return res.status(STATUS_OK).json(diseños);
      } catch (error) {
        return res.status(STATUS_BAD_REQUEST).json({ msg: error.message });
      }
    case "POST":
      try {
        const newDiseño = new Diseño(body);
        const savedDiseño = await newDiseño.save();
        return res.status(STATUS_CREATED).json(savedDiseño);
      } catch (error) {
        return res.status(STATUS_BAD_REQUEST).json({ msg: error.message });
      }
    default:
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ msg: `This method (${method}) is not supported` });
  }
}
