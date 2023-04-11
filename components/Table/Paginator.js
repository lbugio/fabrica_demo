import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/20/solid";

const range = (start, end) => {
  return [...Array(end).keys()].map((el) => {
    return el + start;
  });
};

export const Paginator = ({
  data,
  itemsPerPage,
  currentPage,
  onPageChange,
  setPageSizeValue,
}) => {
  const pagesCount = Math.ceil(data.length / itemsPerPage);
  const pages = range(1, pagesCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;

  const handlePageSizeChange = (e) => {
    setPageSizeValue(e.target.value);
    onPageChange(1); 
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            -
            <span className="font-medium">
              {currentPage * itemsPerPage > data.length
                ? data.length
                : currentPage * itemsPerPage}
            </span>{" "}
            de
            <span className="font-medium">{data.length}</span> resultados
          </p>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="page-size"
            className="text-sm font-medium text-gray-700"
          >
            Resultados por página:
          </label>
          <select
            id="page-size"
            name="page-size"
            className="form-select mt-1 block rounded-md w-max border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => handlePageSizeChange(e)}
            value={itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>{" "}
          </select>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                isFirstPage ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => onPageChange(1)}
            >
              <span className="sr-only">Primero</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                isFirstPage ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {pages.map((page) => {
              const isActive = currentPage === page;
              return (
                <a
                  key={page}
                  href="#"
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0 ${
                    isActive
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-black"
                      : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              );
            })}
            <a
              href="#"
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                isLastPage ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className={`elative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                isLastPage ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => onPageChange(pages.length)}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
