import { Fragment, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Autocomplete } from "components/Autocomplete";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";

export const ModalArticulos = ({
  createEdit,
  setCreateEdit,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  newArticulo,
  setNewArticulo,
  setId,
  articulo,
  tela,
  telas,
  inputTelas,
  setInputTelas,
  avio,
  avios,
  inputAvios,
  setInputAvios,
  diseño,
  diseños,
  inputDiseños,
  setInputDiseños,
}) => {
  //campos dinamicos

  let addTelas = () => {
    setInputTelas([...inputTelas, tela]);
  };

  const handleChangeTelas = (i, e) => {
    const telas = [...inputTelas];
    telas[i][e.target.name] = e.target.value;
    setInputTelas(telas);
    setNewArticulo({ ...newArticulo, telas });
  };

  const removeTelas = (i) => {
    let telas = [...inputTelas];
    telas.splice(i, 1);
    setInputTelas(telas);
  };

  let addAvios = () => {
    setInputAvios([...inputAvios, avio]);
  };

  const handleChangeAvios = (i, e) => {
    const avios = [...inputAvios];
    avios[i][e.target.name] = e.target.value;
    setInputAvios(avios);
    setNewArticulo({ ...newArticulo, avios });
  };

  const removeAvios = (i) => {
    let avios = [...inputAvios];
    avios.splice(i, 1);
    setInputAvios(avios);
  };

  let addDiseños = () => {
    setInputDiseños([...inputDiseños, diseño]);
  };

  const handleChangeDiseños = (i, e) => {
    const diseños = [...inputDiseños];
    diseños[i][e.target.name] = e.target.value;
    setInputDiseños(diseños);
    setNewArticulo({ ...newArticulo, diseños });
  };

  const removeDiseños = (i) => {
    let diseños = [...inputDiseños];
    diseños.splice(i, 1);
    setInputTelas(diseños);
  };

  const nameInput = useRef(null);

  //Imagen
  const imageMimeType = /image\/(png|jpg|jpeg|svg)/i;

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
  }, [file, fileDataURL]);

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
                                        autoComplete="given-name"
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Número"
                                        onChange={handleChange}
                                        value={newArticulo.numero}
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
                                        autoComplete="address-level2"
                                        onChange={handleChange}
                                        value={newArticulo.tipo}
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
                                      <input
                                        type="text"
                                        name="linea"
                                        id="linea"
                                        placeholder="Línea"
                                        autoComplete="address-level2"
                                        onChange={handleChange}
                                        value={newArticulo.linea}
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
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
                                        autoComplete="descripcion"
                                        onChange={handleChange}
                                        value={newArticulo.descripcion}
                                        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                      <p className="text-red-500 text-s italic animate-pulse">
                                        {errors.descripcion
                                          ? errors.descripcion
                                          : null}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-6">
                                    <p className="inline uppercase text-gray-700">
                                      Telas
                                    </p>
                                    <a onClick={() => addTelas()}>
                                      <PlusIcon
                                        className="h-6 w-6 inline ml-2"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                  {inputTelas.map((tela, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-6 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                        <label
                                          htmlFor="descripcion"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Nombre
                                        </label>
                                        <select
                                          id="nombreComponente"
                                          name="nombre"
                                          autoComplete="nombre"
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onChange={(e) =>
                                            handleChangeTelas(index, e)
                                          }
                                          value={tela.nombre}
                                        >
                                          {telas.map((item) => (
                                            <option
                                              className=""
                                              key={item._id}
                                              value={[item._id]}
                                            >
                                              {item.nombre}
                                            </option>
                                          ))}
                                        </select>
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                                        <label
                                          htmlFor="descripcion"
                                          className="flex justify-between text-sm font-medium text-gray-700"
                                        >
                                          Cantidad
                                          {index ? (
                                            <button
                                              type="button"
                                              onClick={() => removeTelas(index)}
                                            >
                                              <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                            </button>
                                          ) : null}
                                        </label>

                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          autoComplete="cantidad"
                                          onChange={(e) =>
                                            handleChangeTelas(index, e)
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
                                    </div>
                                  ))}
                                  <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-6">
                                    <p className="inline uppercase text-gray-700">
                                      Avios
                                    </p>
                                    <a onClick={() => addAvios()}>
                                      <PlusIcon
                                        className="h-6 w-6 inline ml-2"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                  {inputAvios.map((avio, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-6 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                        <label
                                          htmlFor="descripcion"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Nombre
                                        </label>
                                        <select
                                          id="nombreComponente"
                                          name="nombre"
                                          autoComplete="nombre"
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onChange={(e) =>
                                            handleChangeAvios(index, e)
                                          }
                                          value={avio.nombre}
                                        >
                                          {avios.map((item) => (
                                            <option
                                              className=""
                                              key={item._id}
                                              value={[item._id]}
                                            >
                                              {item.nombre}
                                            </option>
                                          ))}
                                        </select>
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                                        <label
                                          htmlFor="descripcion"
                                          className="flex justify-between text-sm font-medium text-gray-700"
                                        >
                                          Cantidad
                                          {index ? (
                                            <button
                                              type="button"
                                              onClick={() => removeAvios(index)}
                                            >
                                              <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                            </button>
                                          ) : null}
                                        </label>

                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          autoComplete="cantidad"
                                          onChange={(e) =>
                                            handleChangeAvios(index, e)
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
                                    </div>
                                  ))}

                                  <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-6">
                                    <p className="inline uppercase text-gray-700">
                                      Diseño
                                    </p>
                                    <a onClick={() => addDiseños()}>
                                      <PlusIcon
                                        className="h-6 w-6 inline ml-2"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </div>
                                  {inputDiseños.map((diseño, index) => (
                                    <div
                                      className="grid grid-cols-6 gap-6 mt-3"
                                      key={index}
                                    >
                                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                        <label
                                          htmlFor="descripcion"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Nombre
                                        </label>
                                        <select
                                          id="nombreComponente"
                                          name="nombre"
                                          autoComplete="nombre"
                                          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onChange={(e) =>
                                            handleChangeDiseños(index, e)
                                          }
                                          value={diseño.nombre}
                                        >
                                          {diseños.map((item) => (
                                            <option
                                              className=""
                                              key={item._id}
                                              value={[item._id]}
                                            >
                                              {item.nombre}
                                            </option>
                                          ))}
                                        </select>
                                        <p className="text-red-500 text-s italic animate-pulse">
                                          {errors.nombre ? errors.nombre : null}
                                        </p>
                                      </div>
                                      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                                        <label
                                          htmlFor="descripcion"
                                          className="flex justify-between text-sm font-medium text-gray-700"
                                        >
                                          Cantidad
                                          {index ? (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeDiseños(index)
                                              }
                                            >
                                              <XCircleIcon className="h-5 w-5 text-red-800 hover:brightness-200" />
                                            </button>
                                          ) : null}
                                        </label>

                                        <input
                                          type="text"
                                          name="cantidad"
                                          id="cantidad"
                                          placeholder="Cantidad"
                                          autoComplete="cantidad"
                                          onChange={(e) =>
                                            handleChangeDiseños(index, e)
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
                                    </div>
                                  ))}

                                  <div className="border border-gray-300 rounded p-2 col-span-6">
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
                                  </div>
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
                                      setNewArticulo(articulo);
                                      setId(null);
                                      setInputTelas([tela]);
                                      setInputAvios([avio]);
                                      setInputDiseños([diseño]);
                                      setFile(null);
                                      setFileDataURL(null);
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
