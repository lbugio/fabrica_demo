import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalAvios } from "components/Modal/ModalAvios";

export default function Avios({ avios, columnas, laoderImage }) {
  const avio = { nombre: "", unidad: "", precio: "", ultimoPrecio: "" };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(avios);

  const [id, setId] = useState(null);

  const [newAvio, setNewAvio] = useState(avio);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getAvios = async () => {
      const res2 = await fetch("/api/avios");
      const dato2 = await res2.json();
      setData(dato2);
    };
    getAvios();
  }, [newAvio]);

  useEffect(() => {
    const getAvios = async () => {
      const res = await fetch("/api/avios/" + id);
      const avio = await res.json();
      setUltimoPrecio(avio.precio);
      setNewAvio({
        nombre: avio.nombre,
        precio: avio.precio,
        unidad: avio.unidad,
        ultimoPrecio: ultimoPrecio,
      });
    };
    if (id) getAvios();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewAvio({ ...newAvio, [e.target.name]: e.target.value });

  const validate = () => {
    const isNumber = /^\d+(\.\d{1,2})?$/;
    const errors = {};

    if (!newAvio.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newAvio.precio) errors.precio = "Ingrese el precio.";
    if (newAvio.precio && !isNumber.test(newAvio.precio))
      errors.precio = "El precio tiene que ser un número.";
    if (!newAvio.unidad) errors.unidad = "Seleccione una unidad.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    if (id) {
      await updateAvio();
      setNewAvio(avio);
      setId(null);
      closeCreateEdit();
    } else {
      await createAvio();
      closeCreateEdit();
    }
  };

  const createAvio = async () => {
    try {
      await fetch("/api/avios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAvio),
      });
    } catch (error) {
      console.error(error);
    }
    setNewAvio(avio);
  };

  const updateAvio = async () => {

    try {
      await fetch(`/api/avios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAvio),
      });
    } catch (error) {
      console.error(error);
    }
    setId(null);
  };

  const handleDelete = async () => {
    deleteAvio();
    closeDelete();
    setNewAvio(avio);
    setId(null);
  };

  const deleteAvio = async () => {
    try {
      await fetch(`/api/avios/${id}`, {
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
        tableName="Avíos"
        columnas={columnas}
        data={data}
        openCreateEdit={openCreateEdit}
        openDelete={openDelete}
        handleDelete={handleDelete}
        setId={setId}
        laoderImage={laoderImage}
      />
      <ModalAvios
        createEdit={createEdit}
        setCreateEdit={setCreateEdit}
        handleDelete={handleDelete}
        handleChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        setId={setId}
        handleSubmit={handleSubmit}
        newAvio={newAvio}
        setNewAvio={setNewAvio}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingData={isLoadingData}
        avio={avio}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewAvio={setNewAvio}
        avio={avio}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/avios`
  );
  const avios = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "acción"];
  const laoderImage = "/avios.svg";

  return {
    props: {
      avios,
      columnas,
      laoderImage,
    },
  };
};
