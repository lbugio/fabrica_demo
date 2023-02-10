import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalTalleres } from "components/Modal/ModalTalleres";

export default function Talleres({ talleres, columnas, laoderImage }) {
  const taller = { nombre: "", precio: "", ultimoPrecio: 0 };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(talleres);

  const [id, setId] = useState(null);

  const [newTaller, setNewTaller] = useState(taller);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getTalleres = async () => {
      
      const res2 = await fetch("http://localhost:3000/api/talleres/");
      const dato2 = await res2.json();

      setData(dato2);
    };
    getTalleres();
  }, [newTaller]);

  useEffect(() => {
    const getTalleres = async () => {
      setIsLoadingData(true);
      const res = await fetch("/api/talleres/" + id);
      setIsLoadingData(false);
      const taller = await res.json();
      setUltimoPrecio(taller.precio);
      setNewTaller({
        nombre: taller.nombre,
        precio: taller.precio,
        ultimoPrecio: ultimoPrecio,
      });
    };
    if (id) getTalleres();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewTaller({ ...newTaller, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newTaller.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newTaller.precio) errors.precio = "Ingrese el precio.";
    if (newTaller.precio && !isNumber.test(newTaller.precio))
      errors.precio = "El precio tiene que ser un número.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSaving(true);

    if (id) {
      await updateTela();
      setNewTaller(taller);
      setId(null);
      closeCreateEdit();
    } else {
      await createTela();
      closeCreateEdit();
    }
    setIsSaving(false);
  };

  const createTela = async () => {
    try {
      await fetch("/api/talleres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaller),
      });
    } catch (error) {
      console.error(error);
    }
    setNewTaller(taller);
  };

  const updateTela = async () => {
    try {
      await fetch(`/api/talleres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaller),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    deleteTela();
    closeDelete();
    setNewTaller(taller);
    setId(null);
  };

  const deleteTela = async () => {
    try {
      await fetch(`/api/talleres/${id}`, {
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
        tableName="Talleres"
        columnas={columnas}
        data={data}
        openCreateEdit={openCreateEdit}
        openDelete={openDelete}
        handleDelete={handleDelete}
        setId={setId}
        laoderImage={laoderImage}
        setIsLoading={setIsLoading}
      />
      <ModalTalleres
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newTaller={newTaller}
        setNewTaller={setNewTaller}
        isLoading={isLoading}
        isLoadingData={isLoadingData}
        isSaving={isSaving}
        taller={taller}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewTaller={setNewTaller}
        taller={taller}      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/talleres`);
  const talleres = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];
  const laoderImage = "/talleres.svg";

  return {
    props: {
      talleres,
      columnas,
      laoderImage,
    },
  };
};
