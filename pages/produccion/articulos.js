import { useState, useEffect } from "react";

import { Table } from "components/Table";
import { ModalDelete } from "components/Modal/ModalDelete";
import { ModalArticulos } from "components/Modal/ModalArticulos";
import { ModalArticulo } from "components/Modal/ModalArticulo";
import { Notification } from "components/Notification";

import API_ENDPOINTS from "constants/enpoints";

const { ARTICULOS, PROCESOS, TELAS, AVIOS, DISEÑOS } = API_ENDPOINTS;

export default function Articulos({
  articulosBack,
  columnas,
  laoderImage,
  procesosBack,
  telasBack,
  aviosBack,
  diseñosBack,
}) {
  const initialItem = {
    numero: "",
    tipo: "",
    descripcion: "",
    linea: "",
    procesos: [],
    telas: [],
    avios: [],
    diseños: [],
  };

  const [createEdit, setCreateEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [data, setData] = useState([articulosBack]);

  const [id, setId] = useState(null);

  const [ficha, setFicha] = useState(false);

  const [ultimoPrecio, setUltimoPrecio] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const [value, setValue] = useState(initialItem.procesos);

  const [item, setItem] = useState(initialItem);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getArticulos = async () => {
      const res2 = await fetch(ARTICULOS);
      const dato2 = await res2.json();
      setData(dato2);
    };
    getArticulos();
  }, [item]);

  useEffect(() => {
    const getArticulo = async () => {
      setIsLoadingData(true);
      const res = await fetch(ARTICULOS + "/" + id);
      setIsLoadingData(false);
      const articuloBack = await res.json();
      setItem(articuloBack);
    };
    if (id) getArticulo();
  }, [id, ultimoPrecio]);

  const openDelete = () => setConfirm(true);
  const closeDelete = () => setConfirm(false);
  const openCreateEdit = () => setCreateEdit(true);
  const closeCreateEdit = () => setCreateEdit(false);
  const openFicha = () => setFicha(true);

  const handleChange = ({ target: { name, value } }) => {
    if (name === "numero") {
      setErrors((prevErrors) => {
        const newPrevErrors = { ...prevErrors };
        delete newPrevErrors[name];
        return newPrevErrors;
      });
    }
    setItem({ ...item, [name]: value });
  };

  const handleBlur = async ({ target: { name, value } }) => {
    const newErrors = {};

    if (name === "numero" && value) {
      // Check if the entered "numero" value already exists in the database
      const response = await fetch(ARTICULOS + `check-unique?value=${value}`);
      const { unique } = await response.json();
      newErrors[name] = unique ? "" : `El articulo ${value} existe.`;

      // Clear the error message
      setErrors((prevErrors) => {
        const newPrevErrors = { ...prevErrors };
        delete newPrevErrors[name];
        return newPrevErrors;
      });
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const validate = () => {
    const {
      numero,
      tipo,
      descripcion,
      linea,
      procesos,
      telas,
      avios,
      diseños,
    } = item;

    const errors = {};

    if (!numero) errors.numero = "Ingrese el número.";
    if (!tipo) errors.tipo = "Ingrese el tipo.";
    if (!descripcion) errors.descripcion = "Ingrese la descripción.";
    if (!linea) errors.linea = "Ingrese la línea.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    setIsSaving(true);
    if (id) {
      await updateArticulo();
      setId(null);
      closeCreateEdit();
    } else {
      await createArticulo();
      closeCreateEdit();
    }
  };

  const createArticulo = async () => {
    try {
      const response = await fetch(ARTICULOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const { msg } = await response.json();

      response.ok
        ? setNotificationType("create")
        : setNotificationType("error");

      setNotificationMessage(msg);
    } catch (error) {
      console.error(error);
    }
    setItem(initialItem);
    setShowNotification(true);
  };

  const updateArticulo = async () => {
    try {
      const response = await fetch(ARTICULOS + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const { msg } = await response.json();

      response.ok ? setNotificationType("edit") : setNotificationType("error");

      setNotificationMessage(msg);
    } catch (error) {
      console.error(error);
    }
    setItem(initialItem);
    setShowNotification(true);
    setId(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    deleteArticulo();
    closeDelete();
    setId(null);
  };

  const deleteArticulo = async () => {
    try {
      const response = await fetch(ARTICULOS + "/" + id, {
        method: "DELETE",
      });

      const { msg } = await response.json();

      if (response.ok) {
        setNotificationMessage(msg);
      }
    } catch (error) {
      console.error(error);
    }
    setShowNotification(true);
    setNotificationType("delete");
    setIsLoading(false);
    setItem(initialItem);
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
        errors={errors}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
        item={item}
        isLoading={isLoading}
        isSaving={isSaving}
        isLoadingData={isLoadingData}
        procesosBack={procesosBack}
        telasBack={telasBack}
        aviosBack={aviosBack}
        diseñosBack={diseñosBack}
        setCreateEdit={setCreateEdit}
        setErrors={setErrors}
        setId={setId}
        setItem={setItem}
        initialItem={initialItem}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        value={value}
        setValue={setValue}
      />
      <ModalArticulo
        ficha={ficha}
        setFicha={setFicha}
        id={id}
        setId={setId}
        item={item}
        setItem={setItem}
        handleBlur={handleBlur}
        initialItem={initialItem}
      />

      <ModalDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={handleDelete}
        setId={setId}
        id={id}
        isLoading={isLoading}
        setItem={setItem}
        initialItem={initialItem}
      />

      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        notificationMessage={notificationMessage}
        notificationType={notificationType}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const resarticulosBack = await fetch(
    (process.env.API_PRODUCCION || process.env.API_LOCAL) + ARTICULOS
  );
  const articulosBack = await resarticulosBack.json();

  const resprocesosBack = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/procesos`
  );
  const procesosBack = await resprocesosBack.json();

  const restelasBack = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/telas`
  );
  const telasBack = await restelasBack.json();

  const resaviosBack = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/avios`
  );
  const aviosBack = await resaviosBack.json();

  const resdiseñosBack = await fetch(
    `${process.env.API_PRODUCCION || process.env.API_LOCAL}/api/disenos`
  );
  const diseñosBack = await resdiseñosBack.json();

  const columnas = ["articulo", "costo", "aumento", "actualizado", "accíón"];

  return {
    props: {
      articulosBack,
      procesosBack,
      telasBack,
      aviosBack,
      diseñosBack,
      columnas,
    },
  };
};
