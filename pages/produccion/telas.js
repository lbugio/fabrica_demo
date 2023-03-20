import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalTelas } from "components/Modal/ModalTelas";
export default function Telas({ telas, columnas, loaderImage }) {

  const tela = { nombre: "", unidad:"", precio: "", ultimoPrecio: ""};

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(telas);

  const [id, setId] = useState(null);

  const [newTela, setNewTela] = useState(tela);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoadingData, setisLoadingData] = useState(false);
  const [isLoadingFieldData, setisLoadingFieldData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



 useEffect(() => {
    const getTelas = async () => {
      setisLoadingData(true)
      const res2 = await fetch("/api/telas/");
      setisLoadingData(false)
      const dato2 = await res2.json();
      setData(dato2);
    };
    getTelas();
  }, [newTela]); 

  useEffect(() => {
    const getTelas = async () => {
      setisLoadingFieldData(true)
      const res = await fetch("/api/telas/" + id);
      setisLoadingFieldData(false)
      const tela = await res.json();
      setUltimoPrecio(tela.precio);
      setNewTela({
        nombre: tela.nombre,
        unidad: tela.unidad,
        precio: tela.precio,
        ultimoPrecio: ultimoPrecio,
      });
    };
    if (id) getTelas();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewTela({ ...newTela, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newTela.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newTela.precio) errors.precio = "Ingrese el precio.";
    if (newTela.precio && !isNumber.test(newTela.precio))
      errors.precio = "El precio tiene que ser un número.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    setIsSaving(true)
    if (id) {
      await updateTela();
      setNewTela(tela);
      setId(null);
      closeCreateEdit();
    } else {
      await createTela();
      closeCreateEdit();
    }
    setIsSaving(false)
  };

  const createTela = async () => {
    try {
      await fetch(`/api/telas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTela),
      });
    } catch (error) {
      console.error(error);
    }
    setNewTela(tela);
  };

  const updateTela = async () => {

    try {
      await fetch(`/api/telas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTela),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true)
    deleteTela();
    closeDelete();
    setNewTela(tela);
    setId(null);
  };

  const deleteTela = async () => {
    try {
      await fetch(`/api/telas/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  };

  return (
    <>
      <Table
        tableName="Telas"
        columnas={columnas}
        data={data}
        openCreateEdit={openCreateEdit}
        openDelete={openDelete}
        handleDelete={handleDelete}
        setId={setId}
        loaderImage={loaderImage}
        setIsLoading={setIsLoading}
        isLoadingData={isLoadingData}
      />
      <ModalTelas
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newTela={newTela}
        setNewTela={setNewTela}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingFieldData={isLoadingFieldData}
        tela={tela}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewTela={setNewTela}
        tela={tela}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/telas`);
  const telas = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];
  const loaderImage ="/telas.svg";

  return {
    props: {
      telas,
      columnas,
      loaderImage
    },
  };
};
