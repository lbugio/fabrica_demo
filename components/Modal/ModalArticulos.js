import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ListBox } from "components/Form/ListBox";
import Image from "next/image";
import { Tooltip } from "components/Tooltip";

export const ModalArticulos = ({
  createEdit,
  setCreateEdit,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  handleBlur,
  item,
  setItem,
  setId,
  procesosBack,
  telasBack,
  aviosBack,
  diseñosBack,
  initialItem,
}) => {
  const { procesos, telas, avios, diseños } = item;

  const lineas = [
    { id: 1, nombre: "Bebe" },
    { id: 2, nombre: "Niño" },
    { id: 3, nombre: "Adulto" },
  ];

  const nameInput = useRef(null);

  const nuevoComponente = {
    nombre: "",
    cantidad: "",
    id: "",
  };

  const addProceso = () => {
    setItem({
      ...item,
      procesos: [...item.procesos, nuevoComponente],
    });
  };

  const handleChangeProcesoListbox = (i, e) => {
    setItem((prevState) => {
      const procesos = [...prevState.procesos];
      procesos[i]["nombre"] = e.nombre;
      procesos[i]["id"] = e._id;
      return { ...prevState, procesos };
    });
  };

  const handleChangeProcesoInput = (i, e) => {
    const { name, value } = e.target;
    setItem((prevState) => {
      const procesos = [...prevState.procesos];
      procesos[i][name] = value;
      return { ...prevState, procesos };
    });
  };

  const removeProceso = (i) => {
    const procesos = [...item.procesos];
    procesos.splice(i, 1);
    setItem({ ...item, procesos });
  };

  const addTela = () => {
    setItem({
      ...item,
      telas: [...item.telas, nuevoComponente],
    });
  };

  const handleChangeTelaListbox = (i, e) => {
    setItem((prevState) => {
      const telas = [...prevState.telas];
      telas[i]["nombre"] = e.nombre;
      telas[i]["id"] = e._id;
      return { ...prevState, telas };
    });
  };

  const handleChangeTelaInput = (i, e) => {
    const { name, value } = e.target;
    setItem((prevState) => {
      const telas = [...prevState.telas];
      telas[i][name] = value;
      return { ...prevState, telas };
    });
  };

  const removeTela = (i) => {
    const telas = [...item.telas];
    telas.splice(i, 1);
    setItem({ ...item, telas });
  };

  const addAvio = () => {
    setItem({
      ...item,
      avios: [...item.avios, nuevoComponente],
    });
  };

  const handleChangeAvioListbox = (i, e) => {
    setItem((prevState) => {
      const avios = [...prevState.avios];
      avios[i]["nombre"] = e.nombre;
      avios[i]["id"] = e._id;
      return { ...prevState, avios };
    });
  };

  const handleChangeAvioInput = (i, e) => {
    const { name, value } = e.target;
    setItem((prevState) => {
      const avios = [...prevState.avios];
      avios[i][name] = value;
      return { ...prevState, avios };
    });
  };

  const removeAvio = (i) => {
    const avios = [...item.avios];
    avios.splice(i, 1);
    setItem({ ...item, avios });
  };

  const addDiseño = () => {
    setItem({
      ...item,
      diseños: [...item.diseños, nuevoComponente],
    });
  };

  const handleChangeDiseñoListbox = (i, e) => {
    setItem((prevState) => {
      const diseños = [...prevState.diseños];
      diseños[i]["nombre"] = e.nombre;
      diseños[i]["id"] = e._id;
      return { ...prevState, diseños };
    });
  };

  const handleChangeDiseñoInput = (i, e) => {
    const { name, value } = e.target;
    setItem((prevState) => {
      const diseños = [...prevState.diseños];
      diseños[i][name] = value;
      return { ...prevState, diseños };
    });
  };

  const removeDiseño = (i) => {
    const diseños = [...item.diseños];
    diseños.splice(i, 1);
    setItem({ ...item, diseños });
  };

  //Imagen
  /*const imageMimeType = /image\/(png|jpg|jpeg|svg)/i;

  const [file, setFile] = useState(null);

  const [fileDataURL, setFileDataURL] = useState(null);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          console.log(fileDataURL);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, fileDataURL]);  */

  //imagen

  return (
    <Transition.Root show={createEdit} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={nameInput}
        onClose={setCreateEdit}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-max sm:max-w-max">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-6">
                          <div className="mt-5 md:col-span-2 md:mt-0">
                            <form
                              action="#"
                              method="POST"
                              encType="multipart/form-data"
                              onSubmit={handleSubmit}
                            >
                              <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-2">
                                      <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Número
                                      </label>
                                      <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Número"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={item.numero}
                                        ref={nameInput}
                                      />
                                      <p className="text-red-500 text-s italic animate-pulse">
                                        {errors.numero ? errors.numero : null}
                                      </p>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                                      <label
                                        htmlFor="tipo"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Tipo
                                      </label>
                                      <input
                                        type="text"
                                        name="tipo"
                                        id="tipo"
                                        placeholder="Tipo"
                                        onChange={handleChange}
                                        value={item.tipo}
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                      <p className="text-red-500 text-s italic animate-pulse">
                                        {errors.tipo ? errors.tipo : null}
                                      </p>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                                      <label
                                        htmlFor="linea"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Línea
                                      </label>
                                      <select
                                        id="linea"
                                        name="linea"
                                        autoComplete="linea"
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                        value={item.linea}
                                      >
                                        <option
                                          value=""
                                          disabled
                                          className="sm:text-sm italic"
                                        >
                                          Linea
                                        </option>

                                        {lineas.map((item) => (
                                          <option
                                            className=""
                                            key={item.id}
                                            value={item.nombre}
                                          >
                                            {item.nombre}
                                          </option>
                                        ))}
                                      </select>
                                      <p className="text-red-500 text-s italic animate-pulse">
                                        {errors.linea ? errors.linea : null}
                                      </p>
                                    </div>

                                    <div className="col-span-6">
                                      <label
                                        htmlFor="descripcion"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Descripción
                                      </label>
                                      <input
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        placeholder="Descripción"
                                        onChange={handleChange}
                                        value={item.descripcion}
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                      <p className="text-red-500 text-s italic animate-pulse">
                                        {errors.descripcion
                                          ? errors.descripcion
                                          : null}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-around">
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-6">
                                      <Tooltip text="Proceso">
                                        <a
                                          onClick={addProceso}
                                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                        >
                                          <Image
                                            src="/articulos.svg"
                                            alt="articulos"
                                            width={50}
                                            height={50}
                                          />
                                        </a>
                                      </Tooltip>
                                    </div>
                                    <div className="col-span-3 sm:col-span-3 lg:col-span-3 mt-6">
                                      <Tooltip text="Telas">
                                        <a
                                          onClick={addTela}
                                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                        >
                                          <Image
                                            src="/telas.svg"
                                            alt="telas"
                                            width={50}
                                            height={50}
                                          />
                                        </a>
                                      </Tooltip>
                                    </div>
                                    <div className="col-span-3 sm:col-span-3 lg:col-span-3 mt-6">
                                      <Tooltip text="Avio">
                                        <a
                                          onClick={addAvio}
                                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                        >
                                          <Image
                                            src="/avios.svg"
                                            alt="avios"
                                            width={50}
                                            height={50}
                                          />
                                        </a>
                                      </Tooltip>
                                    </div>
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-6">
                                      <Tooltip text="Diseños">
                                        <a
                                          onClick={addDiseño}
                                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                        >
                                          <Image
                                            src="/articulos.svg"
                                            alt="articulos"
                                            width={50}
                                            height={50}
                                          />
                                        </a>
                                      </Tooltip>
                                    </div>
                                  </div>
                                  {procesos.map((proceso, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-1 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                                        <p className="mt-3 sm:text-sm">
                                          Proceso {index + 1}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <ListBox
                                          options={procesosBack}
                                          selectedOption={proceso}
                                          onChange={(e) =>
                                            handleChangeProcesoListbox(index, e)
                                          }
                                        />
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.procesos
                                            ? errors.procesos
                                            : null}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          onChange={(e) =>
                                            handleChangeProcesoInput(index, e)
                                          }
                                          value={proceso.cantidad}
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.cantidad
                                            ? errors.cantidad
                                            : null}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeProceso(index)}
                                      >
                                        <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                      </button>
                                    </div>
                                  ))}

                                  {telas.map((tela, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-1 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                                        <p className="mt-3 sm:text-sm">
                                          Tela {index + 1}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <ListBox
                                          options={telasBack}
                                          selectedOption={tela}
                                          onChange={(e) =>
                                            handleChangeTelaListbox(index, e)
                                          }
                                        />
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          onChange={(e) =>
                                            handleChangeTelaInput(index, e)
                                          }
                                          value={tela.cantidad}
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.cantidad
                                            ? errors.cantidad
                                            : null}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeTela(index)}
                                      >
                                        <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                      </button>
                                    </div>
                                  ))}
                                  {avios.map((avio, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-1 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                                        <p className="mt-3 sm:text-sm">
                                          Avio {index + 1}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <ListBox
                                          options={aviosBack}
                                          selectedOption={avio}
                                          onChange={(e) =>
                                            handleChangeAvioListbox(index, e)
                                          }
                                        />
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          onChange={(e) =>
                                            handleChangeAvioInput(index, e)
                                          }
                                          value={avio.cantidad}
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.cantidad
                                            ? errors.cantidad
                                            : null}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeAvio(index)}
                                      >
                                        <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                      </button>
                                    </div>
                                  ))}
                                  {diseños.map((diseño, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-1 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                                        <p className="mt-3 sm:text-sm">
                                          Diseño {index + 1}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <ListBox
                                          options={diseñosBack}
                                          selectedOption={diseño}
                                          onChange={(e) =>
                                            handleChangeDiseñoListbox(index, e)
                                          }
                                        />
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          onChange={(e) =>
                                            handleChangeDiseñoInput(index, e)
                                          }
                                          value={diseño.cantidad}
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.cantidad
                                            ? errors.cantidad
                                            : null}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeDiseño(index)}
                                      >
                                        <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                      </button>
                                    </div>
                                  ))}
                                  {/* <div className="border border-gray-300 rounded p-2 col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Foto del artículo
                                    </label>
                                    <div className="relative mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                      <div className="relative space-y-1 text-center">
                                        {fileDataURL ? (
                                          <div>
                                            <button
                                              button
                                              onClick={() => {
                                                setFileDataURL(null);
                                                setFile(null);
                                              }}
                                              className="text-red-800"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"
                                                />
                                              </svg>
                                            </button>
                                            <Image
                                              src={fileDataURL}
                                              alt="preview"
                                              width={200}
                                              height={200}
                                            />
                                          </div>
                                        ) : (
                                          <>
                                            <svg
                                              className=" mx-auto h-12 w-12 text-gray-400"
                                              stroke="currentColor"
                                              fill="none"
                                              viewBox="0 0 48 48"
                                              aria-hidden="true"
                                            >
                                              <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                              <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                              >
                                                <span>Subir un foto</span>
                                                <input
                                                  id="file-upload"
                                                  name="file-upload"
                                                  type="file"
                                                  className="sr-only"
                                                  onChange={handleChangeFile}
                                                  multiple
                                                />
                                              </label>
                                              <p className="pl-1">
                                                o arrastrar y soltar
                                              </p>
                                            </div>
                                            <p
                                              className={
                                                "text-xs text-gray-500"
                                              }
                                            >
                                              PNG, JPG, GIF hasta 10MB
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>  */}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                  <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Guardar
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                      setCreateEdit(false);
                                      setErrors({});
                                      setItem(initialItem);
                                      setId(null);
                                    }}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
