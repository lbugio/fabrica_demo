import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

export default async function handler(req, res) {
  await dbConnect();

  const { method = "", body = {} } = req;

  switch (method) {
    case "GET":
      try {
        const articulos = await Articulo.find()
          .sort({numero:1})
          .populate([
            { path: "procesos._id", select: "precio nombre" },
            { path: "telas._id", select: "precio nombre unidad" },
            { path: "avios._id", select: "precio nombre unidad" },
            { path: "diseños._id", select: "precio nombre" },
          ]);
        console.log("🚀 ~ file: index.js:20 ~ handler ~ articulos:", articulos)

        const articulosConPrecios = articulos.map((articulo) => {
          const precioConsumoProcesos = articulo.procesos
            ? Number(
                articulo.procesos
                  .map(
                    ({ _id: { precio }, cantidad }) =>
                      cantidad * (precio ? precio : 0)
                  )
                  .reduce((prev, curr) => prev + curr, 0)
              )
            : 0;

          const precioConsumoTelas = Number(
            articulo.telas
              .map(({ _id: { precio, unidad }, cantidad }) => {
                switch (unidad) {
                  case "kg.":
                    return (cantidad * (precio ? precio : 0)) / 1000;
                  case "m.":
                    return (cantidad * precio) / 100;
                  default:
                    return cantidad * precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioConsumoAvios = Number(
            articulo.avios
              .map(({ _id: { precio, unidad }, cantidad }) => {
                switch (unidad) {
                  case "kg.":
                    return (cantidad * (precio ? precio : 0)) / 1000;
                  case "m.":
                    return (cantidad * precio) / 100;
                  default:
                    return cantidad * precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          );

          const precioConsumoDiseño = articulo.diseños
            ? Number(
                articulo.diseños
                  .map(
                    ({ _id: { precio }, cantidad }) =>
                      cantidad * (precio ? precio : 0)
                  )
                  .reduce((prev, curr) => prev + curr, 0)
                  .toFixed(2)
              )
            : 0;

          const costoDirecto =
            precioConsumoProcesos +
            precioConsumoTelas +
            precioConsumoAvios +
            precioConsumoDiseño;

          return {
            ...articulo.toObject(),
            costoDirecto: costoDirecto.toFixed(2),
            costoAdministrativo: (costoDirecto * 0.3).toFixed(2),
            costoTotal: (costoDirecto * 1.3).toFixed(2),
            precioMayor: (costoDirecto * 2 * 1.3).toFixed(2),
            mayorConIva: (costoDirecto * 2 * 1.21 * 1.3).toFixed(2),
            precioVenta: Number((costoDirecto * 3 * 1.3).toFixed(2)),
          };
        });

        console.log("🚀 ~ file: index.js:96 ~ handler ~ articulosConPrecios:", articulosConPrecios)
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
