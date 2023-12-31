import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export const ModalAvios = ({
  createEdit,
  setCreateEdit,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  newAvio,
  setNewAvio,
  avio,
  setId,
}) => {
  const nameInput = useRef(null);

  const unidades = [
    { id: 1, nombre: "kg." },
    { id: 2, nombre: "grms." },
    { id: 3, nombre: "u." },
    { id: 4, nombre: "m." },
  ];

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
                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="first-name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Nombre
                                      </label>
                                      <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                        value={newAvio.nombre}
                                        ref={nameInput}
                                      />
                                      <p className="text-red-500 text-s italic">
                                        {errors.nombre ? errors.nombre : null}
                                      </p>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label
                                        htmlFor="last-name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Precio
                                      </label>
                                      <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                          $
                                        </span>
                                        <input
                                          type="text"
                                          name="precio"
                                          id="precio"
                                          autoComplete="family-name"
                                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          onChange={handleChange}
                                          value={newAvio.precio}
                                          placeholder="0,00"
                                        />
                                        <span className="inline-flex items-center border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm">
                                          /
                                        </span>
                                        <div className="col-span-6 sm:col-span-3">
                                          <select
                                            id="unidad"
                                            name="unidad"
                                            autoComplete="unidad"
                                            className="italic block w-full flex-1 rounded-none border-l-0 rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={handleChange}
                                            value={newAvio.unidad}
                                          >
                                            <option value="" disabled>
                                              Unidad
                                            </option>

                                            {unidades.map((item) => (
                                              <option
                                                className=""
                                                key={item.id}
                                                value={item.nombre}
                                              >
                                                {item.nombre}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                      <p className="text-red-500 text-s italic">
                                        {errors.precio ? errors.precio : null}
                                      </p>
                                      <p className="text-red-500 text-s italic">
                                        {errors.unidad ? errors.unidad : null}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                  <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                      setCreateEdit(false);
                                      setErrors({});
                                      setNewAvio(avio);
                                      setId(null);
                                    }}
                                  >
                                    Cancel
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
