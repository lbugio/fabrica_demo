import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

export default async function handler(req, res) {
  await dbConnect();

  const { method = "", body = {} } = req;

  switch (method) {
    case "GET":
      try {
        const articulos = await Articulo.find().populate([
          { path: "telas.nombre", select: "precio unidad" },
          { path: "avios.nombre", select: "nombre precio" },
          { path: "diseños.nombre", select: "nombre precio" },
          { path: "procesos.nombre", select: "nombre precio" },
        ]);
        const articulosConPrecios = articulos.map((articulo) => {
          const precioTelas = Number(
            articulo.telas
              .map(({ nombre, cantidad }) => {
                switch (nombre.unidad) {
                  case "kg.":
                    return (cantidad * (nombre ? nombre.precio : 0)) / 1000;
                  case "m.":
                    return (cantidad * nombre.precio) / 100;
                  default:
                    return cantidad * nombre.precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioAvios = Number(
            articulo.avios
              .map(
                ({ nombre, cantidad }) =>
                  cantidad * (nombre ? nombre.precio : 0)
              )
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioDiseños = articulo.diseños
            ? Number(
                articulo.diseños
                  .map(
                    ({ nombre, cantidad }) =>
                      cantidad * (nombre ? nombre.precio : 0)
                  )
                  .reduce((prev, curr) => prev + curr, 0)
                  .toFixed(2)
              )
            : 0;

          const precio = precioTelas + precioAvios + precioDiseños;

          return {
            ...articulo.toObject(),
            precioTelas,
            precioAvios,
            precioDiseños,
            precio,
          };
        });

        return res.status(200).json(articulosConPrecios);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        const newArticulo = new Articulo(body);
        const savedArticulo = await newArticulo.save();
        return res
          .status(201)
          .json({ msg: `Se creo el articulo "${savedArticulo.numero}"` });
      } catch (error) {
        return res.status(400).json({ msg: `El articulos no se pudo crear ${error.message}` });
      }
    default:
      return res
        .status(400)
        .json({ msg: `This method (${method}) is not supported` });
  }
}
