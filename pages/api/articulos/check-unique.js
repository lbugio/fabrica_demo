import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

export default async function check(req, res) {
  // Connect to the database
  await dbConnect();

  const {
    query: { value },
  } = req;

  try {
    const existingArticulo = await Articulo.findOne({
      numero: value,
    });
    if (!existingArticulo) {
      return res.status(200).json({ unique: true });
    } else {
      return res
        .status(200)
        .json({
          unique: false,
          msg: `Ya existe el articulo ${existingArticulo.numero} `,
        });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
