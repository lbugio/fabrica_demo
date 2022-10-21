import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/ModalDelete";
import { ModalArticulos } from "components/ModalArticulos";

export default function Articulos({ articulos, columnas, laoderImage }) {
  const articulo = { nombre: "" };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(articulos);

  const [id, setId] = useState(null);

  const [newArticulo, setNewArticulo] = useState(articulo);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getArticulos = async () => {
      const res2 = await fetch("/api/articulos/");
      const dato2 = await res2.json();
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
      setNewArticulo({ nombre: articulo.nombre });
    };
    if (id) getArticulos();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);
  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewArticulo({ ...newArticulo, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newArticulo.nombre) errors.nombre = "Ingrese el nombre.";

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
      await fetch("/api/articulos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticulo),
      });
    } catch (error) {
      console.error(error);
    }
    setNewArticulo(articulo);
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
      />
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
  const res = await fetch(`${process.env.API_LOCAL}/api/articulos`);
  const articulos = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];
  const laoderImage = "/articulos.svg";

  return {
    props: {
      articulos,
      columnas,
      laoderImage,
    },
  };
};
