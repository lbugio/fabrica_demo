import { dbConnect } from "utils/mongoose";
import Articulo from "models/Articulo";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        let articulos = await Articulo.find()
          .populate("telas.nombre", ["precio", "unidad"])
          .populate("avios.nombre", ["precio"])
          .populate("diseños.nombre", ["precio"]);
        console.log("🚀 ~ file: index.js:15 ~ handler ~ articulos", articulos);

        articulos = articulos.map((dato) => ({
          ...dato.toObject(),
          precioTelas: Number(
            dato.telas
              .map((tela) => {
                switch (tela.nombre.unidad) {
                  case "kg.":
                    return (
                      (tela.cantidad * (tela.nombre ? tela.nombre.precio : 0)) /
                      1000
                    );
                  case "m.":
                    return (tela.cantidad * tela.nombre.precio) / 100;
                  default:
                    return tela.cantidad * tela.nombre.precio;
                }
              })
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          ),
          precioAvios: Number(
            dato.avios
              .map(
                (avio) => avio.cantidad * (avio.nombre ? avio.nombre.precio : 0)
              )
              .reduce((prev, curr) => prev + curr, 0)
              .toFixed(2)
          ),
          precioDiseños: dato.diseños
            ? Number(
                dato.diseños
                  .map(
                    (diseño) =>
                      diseño.cantidad *
                      (diseño.nombre ? diseño.nombre.precio : 0)
                  )
                  .reduce((prev, curr) => prev + curr, 0)
                  .toFixed(2)
              )
            : 0,
        }));

        articulos = articulos.map((dato) => ({
          ...dato,
          precio: dato.precioTelas + dato.precioAvios + dato.precioDiseños,
        }));

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
