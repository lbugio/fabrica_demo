import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

export default async function handler(req, res) {
  await dbConnect();

  const { method = "", body = {} } = req;

  switch (method) {
    case "GET":
      try {
        const articulos = await Articulo.find()
          .sort({ numero: 1 })
          .populate([
            { path: "procesos.id", select: "precio nombre" },
            { path: "telas.id", select: "precio unidad nombre" },
            { path: "avios.id", select: "precio nombre unidad" },
            { path: "diseños.id", select: "precio nombre" },
          ]);

        const articulosConPrecios = articulos.map((articulo) => {
          const precioConsumoProcesos = articulo.procesos
            ? Number(
                articulo.procesos
                  .map(({ id, cantidad }) => cantidad * (id ? id.precio : 0))
                  .reduce((prev, curr) => prev + curr, 0)
              )
            : 0;

          const precioConsumoTelas = Number(
            articulo.telas
              .map(({ id, cantidad }) => {
                switch (id.unidad) {
                  case "kg.":
                    return (cantidad * (id ? id.precio : 0)) / 1000;
                  case "m.":
                    return (cantidad * id.precio) / 100;
                  default:
                    return cantidad * id.precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioConsumoAvios = Number(
            articulo.avios
              .map(({ id, cantidad }) => {
                switch (id.unidad) {
                  case "kg.":
                    return (cantidad * (id ? id.precio : 0)) / 1000;
                  case "m.":
                    return (cantidad * id.precio) / 100;
                  default:
                    return cantidad * id.precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioConsumoDiseño = articulo.diseños
            ? Number(
                articulo.diseños
                  .map(({ id, cantidad }) => cantidad * (id ? id.precio : 0))
                  .reduce((prev, curr) => prev + curr, 0)
                  .toFixed(2)
              )
            : 0;

          const precio =
            precioConsumoTelas +
            precioConsumoAvios +
            precioConsumoDiseño +
            precioConsumoProcesos;

          return {
            ...articulo.toObject(),
            precio: precio.toFixed(2),
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
        return res
          .status(400)
          .json({ msg: `El articulos no se pudo crear ${error.message}` });
      }
    default:
      return res
        .status(400)
        .json({ msg: `This method (${method}) is not supported` });
  }
}
