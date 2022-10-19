import { useState, useEffect } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/ModalDelete";
import { ModalTelas } from "components/ModalTelas";

export default function Telas({ telas, columnas }) {
  const tela = { nombre: "", precio: "", ultimoPrecio: "" };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState(telas);

  const [id, setId] = useState(null);

  const [newTela, setNewTela] = useState(tela);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  useEffect(() => {
    const getTelas = async () => {
      const res2 = await fetch("/api/telas/");
      const dato2 = await res2.json();
      console.log("🚀 ~ file: index.js ~ line 25 ~ getTelas ~ dato2", dato2);

      setData(dato2);
    };
    getTelas();
  }, [newTela]);

  useEffect(() => {
    const getTelas = async () => {
      const res = await fetch("/api/telas/" + id);
      const tela = await res.json();
      console.log("🚀 ~ file: index.js ~ line 34 ~ getTelas ~ tela", tela);
      setUltimoPrecio(tela.precio);
      console.log(
        "🚀 ~ file: index.js ~ line 34 ~ getTelas ~ tela",
        ultimoPrecio
      );
      setNewTela({
        nombre: tela.nombre,
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

    if (id) {
      await updateTela();
      setNewTela(tela);
      setId(null);
      closeCreateEdit();
    } else {
      await createTela();
      closeCreateEdit();
    }
  };

  const createTela = async () => {
    try {
      await fetch("/api/telas", {
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
      await fetch(`http://localhost:300/api/telas/${id}`, {
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
  const res = await fetch("/api/telas");
  const telas = await res.json();
  const columnas = ["nombre", "precio", "aumento", "actualizado", "Acción"];

  return {
    props: {
      telas,
      columnas,
    },
  };
};
