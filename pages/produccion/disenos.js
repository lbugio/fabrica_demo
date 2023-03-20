import { useState, useEffect, useReducer } from "react";
import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalDiseños } from "components/Modal/ModalDiseños";
import API_ENDPOINTS from "constants/enpoints";

const { DISEÑOS } = API_ENDPOINTS;

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

  const initialState = {
    nombre: "",
    precio: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "ACTUALIZAR_CAMPO":
        return {
          ...state,
          [action.campo]: action.valor,
        };
      case "LIMPIAR_FORMULARIO":
        return initialState;
      default:
        throw new Error(`Acción desconocida: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const actualizarCampo = (event) => {
    dispatch({
      type: "ACTUALIZAR_CAMPO",
      campo: event.target.id,
      valor: event.target.value,
    });
  };

  const limpiarFormulario = () => {
    dispatch({
      type: "LIMPIAR_FORMULARIO",
    });
  };

  useEffect(() => {
    const getDiseños = async () => {
      setisLoadingData(true);
      const res2 = await fetch(DISEÑOS);
      setisLoadingData(false);
      const dato2 = await res2.json();
      setData(dato2);
    };
    getDiseños();
  }, [newDiseño]);

  useEffect(() => {
    const getDiseños = async () => {
      setisLoadingFieldData(true);
      const res = await fetch(DISEÑOS + id);
      setisLoadingFieldData(false);
      const { nombre, precio } = await res.json();
      setUltimoPrecio(precio);
      dispatch({ type: "ACTUALIZAR_CAMPO", campo: "nombre", valor: nombre });
      dispatch({ type: "ACTUALIZAR_CAMPO", campo: "precio", valor: precio });
    };
    if (id) getDiseños();
  }, [id, ultimoPrecio, dispatch]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);

  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setNewDiseño({ ...newDiseño, [e.target.name]: e.target.value });

  const validate = () => {
    const { nombre, precio } = state;
    const errors = {};

    !nombre?.trim() && (errors.nombre = "Ingrese el nombre.");
    !precio && (errors.precio = "Ingrese el precio.");
    isNaN(precio) && (errors.precio = "El precio tiene que ser un número.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      if (id) {
        await updateDiseño();
        setNewDiseño(diseño);
        setId(null);
        closeCreateEdit();
      } else {
        await createDiseño();
      }
      closeCreateEdit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      limpiarFormulario();
    }
  };

  const createDiseño = async () => {
    try {
      await fetch(DISEÑOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
    } catch (error) {
      console.error(error);
    }
    setNewDiseño(diseño);
  };

  const updateDiseño = async () => {
    try {
      await fetch(DISEÑOS + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
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
      await fetch(DISEÑOS + id, {
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
        state={state}
        setNewDiseño={setNewDiseño}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingFieldData={isLoadingFieldData}
        diseño={diseño}
        actualizarCampo={actualizarCampo}
        limpiarFormulario={limpiarFormulario}
      />
      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        isLoading={isLoading}
        setNewDiseño={setNewDiseño}
        diseño={diseño}
        limpiarFormulario={limpiarFormulario}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    process.env.API_PRODUCCION || process.env.API_LOCAL + DISEÑOS
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
