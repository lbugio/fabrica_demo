import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

import STATUS from "constants/status";

const { OK, NOT_FOUND, BAD_REQUEST } = STATUS;

// Connect to the database

export default async function articulosHandler(req, res) {
  await dbConnect();

  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        // Busca el artículo por id y realiza el populate de los datos necesarios
        const articulo = await Articulo.findById(id).populate([
          { path: "procesos._id", select: "precio nombre" },
          { path: "telas._id", select: "precio nombre unidad" },
          { path: "avios._id", select: "precio nombre unidad" },
          { path: "diseños._id", select: "precio nombre" },
        ]);

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

        const unidadConsumoLookup = {
          "kg.": "grms.",
          "m.": "cms.",
          "u.": "u.",
        };

        const formattedArticulo = {
          ...articulo.toObject(),
          procesos: articulo.procesos.map(
            ({ _id: { _id, nombre, precio }, cantidad }) => ({
              _id,
              nombre,
              precio,
              cantidad,
            })
          ),
          telas: articulo.telas.map(
            ({ _id: { _id, nombre, precio, unidad }, cantidad }) => ({
              _id,
              nombre,
              cantidad,
              precio,
              unidad,
              unidadConsumo: unidadConsumoLookup[unidad] || "",
            })
          ),
          avios: articulo.avios.map(
            ({ _id: { _id, nombre, precio, unidad }, cantidad }) => ({
              _id,
              nombre,
              cantidad,
              precio,
              unidad,
              unidadConsumo: unidadConsumoLookup[unidad] || "",
            })
          ),
          diseños: articulo.diseños.map(
            ({ _id: { _id, nombre, precio, unidad }, cantidad }) => ({
              _id,
              nombre,
              cantidad,
              precio,
              unidad,
              unidadConsumo: unidadConsumoLookup[unidad] || "u.",
            })
          ),
          precioConsumoProcesos,
          precioConsumoTelas,
          precioConsumoAvios,
          precioConsumoDiseño,
          costoDirecto: costoDirecto.toFixed(2),
          costoAdministrativo: (costoDirecto * 0.3).toFixed(2),
          costoTotal: (costoDirecto * 1.3).toFixed(2),
          precioMayor: (costoDirecto * 2 * 1.3).toFixed(2),
          mayorConIva: (costoDirecto * 2 * 1.21 * 1.3).toFixed(2),
          precioVenta: (costoDirecto * 3 * 1.3).toFixed(2),
        };

        // Devuelve el artículo si existe
        if (!formattedArticulo)
          return res.status(NOT_FOUND).json({ msg: "El articulo no existe" });

        return res.status(OK).json(formattedArticulo);
      } catch (error) {
        // Maneja los errores de la solicitud
        return res.status(BAD_REQUEST).json({ msg: error.message });
      }
    case "PUT":
      try {
        const articulo = await Articulo.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!articulo)
          return res.status(NOT_FOUND).json({ msg: "El articulo no existe" });
        return res
          .status(OK)
          .json({ msg: `Se actualizo el articulo ${articulo.numero}` });
      } catch (error) {
        return res.status(BAD_REQUEST).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedArticulo = await Articulo.findByIdAndDelete(id);
        if (!deletedArticulo)
          return res.status(NOT_FOUND).json({ msg: "El articulo no existe" });
        return res
          .status(OK)
          .json({ msg: `Se elimino el articulo ${deletedArticulo.numero}` });
      } catch (error) {
        return res.status(BAD_REQUEST).json({ msg: error.message });
      }
    default:
      return res
        .status(BAD_REQUEST)
        .json({ msg: "Este metodo no es soportado" });
  }
}
