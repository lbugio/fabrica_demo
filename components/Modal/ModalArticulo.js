import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

export const ModalArticulo = ({
  articulo,
  ficha,
  setFicha,
  setId,
  componentes,
  item,
  setItem
}) => {
  const { numero, linea, descripcion, costoDirecto } = item;

  //funcion para calcular el precio unitario
  const totalPorItem = (precio, consumo, unidad) => {
    switch (unidad) {
      case "kg.":
        return (precio * consumo) / 1000;
      case "m.":
        return (precio * consumo) / 100;
      default:
        return precio * consumo;
    }
  };

  return (
    <Transition.Root show={ficha} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setFicha}>
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
                <div className="max-w-sm w-full lg:max-w-full lg:flex">
                  <Image
                    src="/card-top.jpg"
                    alt="Sunset in the mountains"
                    width={200}
                    height={200}
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                  />
                  <section>
                    <div className="max-w-5xl mx-auto bg-white">
                      <article className="overflow-hidden">
                        <div className="bg-[white] rounded-b-md">
                          <div className="p-9">
                            <div className="space-y-6 text-slate-700">
                              <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                {numero} {linea} {descripcion}
                              </p>
                            </div>
                          </div>
                          {/* <div className="p-9">
                            <div className="flex w-full">
                              <div className="grid grid-cols-4 gap-12">
                                <div className="text-sm font-light text-slate-500">
                                  <p className="text-sm font-normal text-slate-700">
                                    Invoice Detail:
                                  </p>
                                  <p>Unwrapped</p>
                                  <p>Fake Street 123</p>
                                  <p>San Javier</p>
                                  <p>CA 1234</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                  <p className="text-sm font-normal text-slate-700">
                                    Billed To
                                  </p>
                                  <p>The Boring Company</p>
                                  <p>Tesla Street 007</p>
                                  <p>Frisco</p>
                                  <p>CA 0000</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                  <p className="text-sm font-normal text-slate-700">
                                    Invoice Number
                                  </p>
                                  <p>000000</p>

                                  <p className="mt-2 text-sm font-normal text-slate-700">
                                    Date of Issue
                                  </p>
                                  <p>00.00.00</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                  <p className="text-sm font-normal text-slate-700">
                                    Terms
                                  </p>
                                  <p>0 Days</p>

                                  <p className="mt-2 text-sm font-normal text-slate-700">
                                    Due
                                  </p>
                                  <p>00.00.00</p>
                                </div>
                              </div>
                            </div>
                          </div> */}

                          <div className="p-9">
                            <div className="flex flex-col mx-0 mt-8">
                              <table className="min-w-full divide-y divide-slate-500">
                                <thead>
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                                    >
                                      Descricpción
                                    </th>
                                    <th
                                      scope="col"
                                      className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                    >
                                      Consumo
                                    </th>
                                    <th
                                      scope="col"
                                      className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                                    >
                                      Precio Unitario
                                    </th>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                                    >
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {componentes.map(
                                    (
                                      {
                                        nombre,
                                        cantidad,
                                        unidadConsumo,
                                        precio,
                                        unidad,
                                      },
                                      index
                                    ) => {
                                      return (
                                        <tr
                                          className="border-b border-slate-200"
                                          key={index}
                                        >
                                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                            <div className="font-medium text-slate-700">
                                              {nombre}
                                            </div>
                                          </td>
                                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                            {cantidad}{" "}
                                            <span className="text-xs italic">
                                              {" "}
                                              {unidadConsumo}
                                            </span>
                                          </td>
                                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                            $ {precio}{" "}
                                            <span className="text-xs italic">
                                              {" "}
                                              {unidad}
                                            </span>
                                          </td>
                                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                            ${" "}
                                            {totalPorItem(
                                              precio,
                                              cantidad,
                                              unidad
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th
                                      scope="row"
                                      colSpan="3"
                                      className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                                    >
                                      Costo Directo
                                    </th>
                                    <th
                                      scope="row"
                                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                                    >
                                      Total
                                    </th>
                                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                      {"$"} {costoDirecto}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setFicha(false);
                          setId(null);
                          setItem([articulo]);
                        }}
                      >
                        Cerrar
                      </button>
                    </div>
                  </section>
                </div>

                {/*  <Image
                    src="/card-top.jpg"
                    alt="Sunset in the mountains"
                    width={200}
                    height={200}
                    className="w-full"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      The Coldest Sunset
                    </div>
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #photography
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #travel
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #winter
                    </span>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6"></div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            setFicha(false);
                            setId(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div> */}
                {/* <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                          <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Artículos
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                Nota:...
                              </p>
                            </div>
                          </div>
                          <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="overflow-hidden shadow sm:rounded-md">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6"></div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => {
                                    setFicha(false);
                                    setId(null);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
