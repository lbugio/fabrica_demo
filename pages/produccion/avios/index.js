import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/ModalDelete";
import { ModalAvios } from "components/ModalAvios";

export default function Avios({ avios, columnas }) {
  const avio = { nombre: "", precio:'', ultimoPrecio:0};

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(avios);

  const [id, setId] = useState(null);

  const [newAvio, setNewAvio] = useState(avio);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  useEffect(() => {
    const getAvios = async () => {
      const res2 = await fetch("http://localhost:3000/api/avios/");
      const dato2 = await res2.json();
      console.log("🚀 ~ file: index.js ~ line 25 ~ getAvios ~ dato2", dato2)
      
      setData(dato2);
    };
    getAvios();
  }, [newAvio]);

  useEffect(() => {
    const getAvios = async () => {
      const res = await fetch("http://localhost:3000/api/avios/" + id);
      const avio = await res.json();
      console.log("🚀 ~ file: index.js ~ line 34 ~ getAvios ~ avio", avio)
      setUltimoPrecio(avio.precio)
      console.log("🚀 ~ file: index.js ~ line 34 ~ getAvios ~ avio", ultimoPrecio)
      setNewAvio({ nombre: avio.nombre, precio: avio.precio, ultimoPrecio: ultimoPrecio});
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
    const isNumber = /^(0|[1-9][0-9]*)$/;
    const errors = {};

    if (!newAvio.nombre) errors.nombre = "Ingrese el nombre.";
    if (!newAvio.precio) errors.precio = "Ingrese el precio.";
    if (newAvio.precio && !isNumber.test(newAvio.precio))
      errors.precio = "El precio tiene que ser un número.";

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
      await fetch("http://localhost:3000/api/avios", {
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
      await fetch(`http://localhost:3000/api/avios/${id}`, {
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
      await fetch(`http://localhost:3000/api/avios/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
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
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/avios");
  const avios = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "acción"]

  return {
    props: {
      avios,
      columnas
    },
  };
};
