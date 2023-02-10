import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalDiseños } from "components/Modal/ModalDiseños";
export default function Diseños({ diseños, columnas, loaderImage }) {
  const diseño = { nombre: "", unidad: "", precio: "", ultimoPrecio: "" };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(diseños);

  const [id, setId] = useState(null);

  const [newDiseño, setNewDiseño] = useState(diseño);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoadingData, setisLoadingData] = useState(false);
  const [isLoadingFieldData, setisLoadingFieldData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDiseños = async () => {
      setisLoadingData(true);
      const res2 = await fetch("/api/disenos/");
      setisLoadingData(false);
      const dato2 = await res2.json();
      
      setData(dato2);
    };
    getDiseños();
  }, [newDiseño]);

  useEffect(() => {
    const getDiseños = async () => {
      setisLoadingFieldData(true);
      const res = await fetch("/api/disenos/" + id);
      setisLoadingFieldData(false);
      const diseño = await res.json();
      setUltimoPrecio(diseño.precio);
      setNewDiseño({
        nombre: diseño.nombre,
        unidad: diseño.unidad,
        precio: diseño.precio,
        ultimoPrecio: ultimoPrecio,
      });
    };
    if (id) getDiseños();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewDiseño({ ...newDiseño, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newDiseño.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newDiseño.precio) errors.precio = "Ingrese el precio.";
    if (newDiseño.precio && !isNumber.test(newDiseño.precio))
      errors.precio = "El precio tiene que ser un número.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    setIsSaving(true);
    if (id) {
      await updateDiseño();
      setNewDiseño(diseño);
      setId(null);
      closeCreateEdit();
    } else {
      await createDiseño();
      closeCreateEdit();
    }
    setIsSaving(false);
  };

  const createDiseño = async () => {
    try {
      await fetch(`/api/disenos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiseño),
      });
    } catch (error) {
      console.error(error);
    }
    setNewDiseño(diseño);
  };

  const updateDiseño = async () => {
    try {
      await fetch(`/api/disenos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiseño),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    deleteDiseño();
    closeDelete();
    setNewDiseño(diseño);
    setId(null);
  };

  const deleteDiseño = async () => {
    try {
      await fetch(`/api/disenos/${id}`, {
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
        tableName="Diseños"
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
      <ModalDiseños
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newDiseño={newDiseño}
        setNewDiseño={setNewDiseño}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingFieldData={isLoadingFieldData}
        diseño={diseño}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewDiseño={setNewDiseño}
        diseño={diseño}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/disenos`
  );
  const diseños = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];

  return {
    props: {
      diseños,
      columnas,
    },
  };
};
