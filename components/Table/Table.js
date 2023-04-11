import { useRef, useState, useMemo, useCallback } from "react";

import { Tooltip } from "components/Tooltip";
import { Paginator } from "components/Table/Paginator";

import { PrinterIcon } from "@heroicons/react/24/solid";
import ReactToPrint from "react-to-print";

import {
  TrashIcon,
  PencilSquareIcon,
  ChevronLeftIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const Table = ({
  data,
  tableName,
  columnas,
  lineas,
  openDelete,
  setId,
  openCreateEdit,
  isLoadingData,
  openFicha,
}) => {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  //searchData
  const filteredData = data.filter((row) => {
    return Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  });

  //ordenar data
  const sortedData = filteredData.sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
  
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
  
    if (sortDirection === "asc") {
      if (aString < bString) return -1;
      if (aString > bString) return 1;
      return 0;
    } else {
      if (aString > bString) return -1;
      if (aString < bString) return 1;
      return 0;
    }
  });
  

  //display de columnas
  const handleSort = useCallback(
    (event) => {
      const column = event.target.dataset.column;
      if (column === sortColumn) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection]
  );

  const columnasMapped = useMemo(
    () =>
      columnas.map((item) => (
        <th
          scope="col"
          className="p-2 text-xs text-center"
          key={`column-${item}`}
          onClick={handleSort}
          data-column={item}
        >
          {item}
        </th>
      )),
    [columnas, handleSort]
  );

  //paginador

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeValue, setPageSizeValue] = useState(5);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSizeValue,
    currentPage * pageSizeValue
  );

  //formato fechas
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  //impresion tabla
  const printRef = useRef();

  //porcentaje aumento
  const porcentajeAumento = (precio, ultimoPrecio) => {
    const resultado = (precio / ultimoPrecio - 1) * 100;
    return isFinite(resultado) ? resultado.toFixed() + "%" : "0%";
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
      <div className="flex justify-between items-center py-4 px-4 bg-white dark:bg-gray-800">
        <div className="uppercase font-bold text-xl">{tableName}</div>
        <button
          onClick={openCreateEdit}
          className="text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Crear
        </button>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {data.length > 0 ? (
        isLoadingData ? (
          <div className="flex justify-center py-4 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <p className="animate-pulse italic">Cargando Datos...</p>
          </div>
        ) : (
          <table
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            ref={printRef}
          >
            <thead className="text-xs text-gray-700 uppercase bg-indigo-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {columnasMapped}
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columnasMapped.length + 1} className="text-center py-4 text-lg">
                    Dato no encontrado
                  </td>
                </tr>
              ) : (
                data.map(
                  (
                    {
                      _id,
                      nombre,
                      numero,
                      precio,
                      unidad,
                      ultimoPrecio,
                      updatedAt,
                      costoDirecto,
                      costoAdministrativo,
                      costoTotal,
                      precioMayor,
                      mayorConIva,
                      precioVenta,
                    },
                    index
                  ) => (
                    <tr
                      key={index}
                      className="text-center bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500 hover:text-black hover:font-semibold dark:hover:bg-gray-600 px-1 font-medium"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td
                        scope="row"
                        className="flex items-center text-gray-900 whitespace-nowrap dark:text-white pl-3 text-base font-semibold"
                      >
                        {nombre || numero}
                      </td>
                      <td>
                        <span className="inline-block">
                          ${" "}
                          {precio ? (
                            <>
                              {precio}
                              {unidad && (
                                <span className="italic">/{unidad}</span>
                              )}
                            </>
                          ) : (
                            costoDirecto
                          )}
                        </span>
                      </td>

                      {tableName === "Articulos" ? (
                        <>
                          <td>{"$ " + costoAdministrativo}</td>
                          <td>{"$ " + costoTotal}</td>
                          <td>{"$ " + precioMayor}</td>
                          <td>{"$ " + mayorConIva}</td>
                          <td>{"$ " + precioVenta}</td>
                        </>
                      ) : null}

                      <td>
                        {porcentajeAumento(precio, ultimoPrecio)}
                      </td>
                      <td>
                        {/*                   <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                         */}{" "}
                        {`${new Date(updatedAt).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )} hs.`}
                      </td>
                      <td className="px-4 flex justify-between ">
                        {tableName == "Articulos" ? (
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              openFicha();
                              setId(_id);
                            }}
                          >
                            <DocumentIcon
                              className="h-6 w-6 text-blue-800 hover:brightness-200"
                              aria-hidden="true"
                            />
                          </button>
                        ) : null}
                        <button
                          type="button"
                          data-modal-toggle="editUserModal"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            openCreateEdit();
                            setId(_id);
                          }}
                        >
                          <PencilSquareIcon
                            className="h-6 w-6 text-green-800 hover:brightness-200"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            openDelete();
                            setId(_id);
                          }}
                        >
                          <TrashIcon
                            className="h-6 w-6 text-red-800 hover:brightness-200"
                            aria-hidden="true"
                          />
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        )
      ) : (
        <div className="flex justify-center py-4 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <p className="animate-pulse italic">No hay datos cargados</p>
        </div>
      )}
      <Paginator
        data={data}
        itemsPerPage={pageSizeValue}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        setPageSizeValue={setPageSizeValue}
      />
      <div className="flex justify-between px-4 pt-4 pb-4 lg:px-6 text-slate-800 hover:brightness-200">
        <Link
          href="/"
          type="button"
          className="group flex font-semibold text-sm leading-6  dark:text-slate-200 dark:hover:text-white"
        >
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
          Volver
        </Link>
        <Tooltip text="Imprimir!">
          <ReactToPrint
            trigger={() => (
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded  px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {}}
              >
                <PrinterIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            content={() => printRef.current}
          />
        </Tooltip>
      </div>
    </div>
  );
};
