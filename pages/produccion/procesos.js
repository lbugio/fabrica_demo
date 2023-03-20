import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalProcesos } from "components/Modal/ModalProcesos";
import API_ENDPOINTS from "constants/enpoints";

const { PROCESOS } = API_ENDPOINTS;

export default function Procesos({ procesos, columnas, loaderImage }) {
  const proceso = { nombre: "", unidad: "", precio: "", ultimoPrecio: "" };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(procesos);

  const [id, setId] = useState(null);

  const [newProceso, setNewProceso] = useState(proceso);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoadingData, setisLoadingData] = useState(false);
  const [isLoadingFieldData, setisLoadingFieldData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProcesos = async () => {
      setisLoadingData(true);
      const res2 = await fetch(PROCESOS);
      setisLoadingData(false);
      const dato2 = await res2.json();
      setData(dato2);
    };
    getProcesos();
  }, [newProceso]);

  useEffect(() => {
    const getProcesos = async () => {
      setisLoadingFieldData(true);
      const res = await fetch(PROCESOS + id);
      setisLoadingFieldData(false);
      const proceso = await res.json();
      setUltimoPrecio(proceso.precio);
      setNewProceso({
        nombre: proceso.nombre,
        unidad: proceso.unidad,
        precio: proceso.precio,
        ultimoPrecio: ultimoPrecio,
      });
    };
    if (id) getProcesos();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewProceso({ ...newProceso, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newProceso.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newProceso.precio) errors.precio = "Ingrese el precio.";
    if (newProceso.precio && !isNumber.test(newProceso.precio))
      errors.precio = "El precio tiene que ser un número.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    setIsSaving(true);
    if (id) {
      await updateProceso();
      setNewProceso(proceso);
      setId(null);
      closeCreateEdit();
    } else {
      await createProceso();
      closeCreateEdit();
    }
    setIsSaving(false);
  };

  const createProceso = async () => {
    try {
      await fetch(PROCESOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProceso),
      });
    } catch (error) {
      console.error(error);
    }
    setNewProceso(proceso);
  };

  const updateProceso = async () => {
    try {
      await fetch(PROCESOS + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProceso),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    deleteProceso();
    closeDelete();
    setNewProceso(proceso);
    setId(null);
  };

  const deleteProceso = async () => {
    try {
      await fetch(PROCESOS + id, {
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
        tableName="Procesos"
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
      <ModalProcesos
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newProceso={newProceso}
        setNewProceso={setNewProceso}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingFieldData={isLoadingFieldData}
        proceso={proceso}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewProceso={setNewProceso}
        proceso={proceso}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    process.env.API_PRODUCCION || process.env.API_LOCAL + PROCESOS
  );
  const procesos = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];
  const loaderImage = "/procesos.svg";

  return {
    props: {
      procesos,
      columnas,
      loaderImage,
    },
  };
};
