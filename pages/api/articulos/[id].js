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
          { path: "procesos.id", select: "precio nombre" },
          { path: "telas.id", select: "precio unidad nombre" },
          { path: "avios.id", select: "precio nombre unidad" },
          { path: "diseños.id", select: "precio nombre" },
        ]);

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

        const costoDirecto =
          precioConsumoTelas +
          precioConsumoAvios +
          precioConsumoDiseño +
          precioConsumoProcesos;

        const unidadConsumoLookup = {
          "kg.": "grms.",
          "m.": "cms.",
          "u.": "u.",

        };

        const formattedArticulo = {
          ...articulo.toObject(),
          procesos: articulo.procesos.map(
            ({ id: { _id, nombre, precio, unidad }, cantidad }) => ({
              id: _id,
              nombre: nombre,
              cantidad: cantidad,
              precio: precio,
              unidad,
            })
          ),
          telas: articulo.telas.map(({ id, cantidad }) => ({
            id: id._id,
            nombre: id.nombre,
            cantidad,
            precio: id.precio,
            unidad: id.unidad,
            unidadConsumo: unidadConsumoLookup[id.unidad] || "",
          })),
          avios: articulo.avios.map(({ id, cantidad }) => ({
            id: id._id,
            nombre: id.nombre,
            cantidad: cantidad,
            precio: id.precio,
            unidad: id.unidad,
            unidadConsumo: unidadConsumoLookup[id.unidad] || "",
          })),
          diseños: articulo.diseños.map(({ id, cantidad }) => ({
            id: id._id,
            nombre: id.nombre,
            cantidad: cantidad,
            precio: id.precio,
            unidad: "u.",
          })),
          precioConsumoTelas,
          precioConsumoAvios,
          precioConsumoDiseño,
          precioConsumoProcesos,
          costoDirecto: costoDirecto.toFixed(2),
          costosAdministrativos: (costoDirecto * 1.3).toFixed(2),
          precioMayor: (costoDirecto * 2).toFixed(2),
          mayorConIva: (costoDirecto * 2*1.21).toFixed(2),
          precioVenta: (costoDirecto * 3).toFixed(2),



        };

        console.log("🚀 ~ file: [id].js:136 ~ articulosHandler ~ formattedArticulo:", formattedArticulo)
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
