import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalArticulos } from "components/Modal/ModalArticulos";
import { ModalArticulo } from "components/Modal/ModalArticulo";

export default function Articulos({
  articulos,
  columnas,
  laoderImage,
  telas,
  avios,
  diseños,
}) {
  const tela = {
    nombre: "",
    cantidad: "",
  };

  const avio = {
    nombre: "",
    cantidad: "",
  };

  const diseño = {
    nombre: "",
    cantidad: "",
  };

  const articulo = {
    numero: "",
    tipo: "",
    descripcion: "",
    linea: "",
  };

  const [createEdit, setCreateEdit] = useState(false);

  const [ficha, setFicha] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(articulos);

  const [id, setId] = useState(null);

  const [newArticulo, setNewArticulo] = useState(articulo);

  const [inputTelas, setInputTelas] = useState([tela]);

  const [inputAvios, setInputAvios] = useState([avio]);

  const [inputDiseños, setInputDiseños] = useState([diseño]);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getArticulos = async () => {
      const res2 = await fetch("/api/articulos/");
      const dato2 = await res2.json();
      console.log("🚀 ~ file: articulos.js:65 ~ getArticulos ~ dato2", dato2);
      setData(dato2);
    };
    getArticulos();
  }, [newArticulo]);

  useEffect(() => {
    const getArticulos = async () => {
      setIsLoadingData(true);
      const res = await fetch("/api/articulos/" + id);
      setIsLoadingData(false);
      const articulo = await res.json();
      setUltimoPrecio(articulo.precio);
      setNewArticulo({
        numero: articulo.numero,
        tipo: articulo.tipo,
        descripcion: articulo.descripcion,
        linea: articulo.linea,
      });
      setInputTelas(articulo.telas);
      setInputAvios(articulo.avios);
      setInputDiseños(articulo.diseños);
    };
    if (id) getArticulos();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);
  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);
  const openFicha = () => setFicha(true);
  const closeFicha = () => setFicha(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewArticulo({ ...newArticulo, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newArticulo.numero) errors.numero = "Ingrese el número.";
    if (!newArticulo.tipo) errors.tipo = "Ingrese el tipo.";
    if (!newArticulo.descripcion)
      errors.descripcion = "Ingrese la descripción.";
    if (!newArticulo.linea) errors.linea = "Ingrese la línea.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    setIsSaving(true);
    if (id) {
      await updateArticulo();
      setNewArticulo(articulo);
      setInputTelas([tela]);
      setInputAvios([avio]);
      setInputDiseños([diseño]);
      setId(null);
      closeCreateEdit();
    } else {
      await createArticulo();
      closeCreateEdit();
    }
    setIsSaving(true);
  };

  const createArticulo = async () => {
    try {
      await fetch(`/api/articulos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticulo),
      });
      console.log(
        "🚀 ~ file: articulos.js:145 ~ createArticulo ~ newArticulo",
        newArticulo
      );
    } catch (error) {
      console.error(error);
    }
    setNewArticulo(articulo);
    setInputTelas([tela]);
    setInputAvios([avio]);
    setInputDiseños([diseño]);
  };

  const updateArticulo = async () => {
    try {
      await fetch(`/api/articulos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticulo),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    deleteArticulo();
    closeDelete();
    setNewArticulo(articulo);
    setId(null);
  };

  const deleteArticulo = async () => {
    try {
      await fetch(`/api/articulos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Table
        tableName="Articulos"
        columnas={columnas}
        data={data}
        openCreateEdit={openCreateEdit}
        openFicha={openFicha}
        openDelete={openDelete}
        handleDelete={handleDelete}
        setId={setId}
        laoderImage={laoderImage}
        setIsLoading={setIsLoading}
      />
      <ModalArticulos
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newArticulo={newArticulo}
        setNewArticulo={setNewArticulo}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingData={isLoadingData}
        articulo={articulo}
        tela={tela}
        telas={telas}
        inputTelas={inputTelas}
        setInputTelas={setInputTelas}
        avio={avio}
        avios={avios}
        inputAvios={inputAvios}
        setInputAvios={setInputAvios}
        diseños={diseños}
        diseño={diseño}
        inputDiseños={inputDiseños}
        setInputDiseños={setInputDiseños}
      />
      <ModalArticulo ficha={ficha} setFicha={setFicha} setId={setId} />

      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewArticulo={setNewArticulo}
        articulo={articulo}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const resArticulos = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/articulos`
  );
  const articulos = await resArticulos.json();

  const resTelas = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/telas`
  );
  const telas = await resTelas.json();

  const resAvios = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/avios`
  );
  const avios = await resAvios.json();

  const resDiseños = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/disenos`
  );
  const diseños = await resDiseños.json();

  const columnas = ["articulo", "precio", "aumento", "actualizado", "accíón"];

  return {
    props: {
      articulos,
      telas,
      avios,
      diseños,
      columnas,
    },
  };
};
