import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function ComboBox({ options, placeholder, value, selectedOption, setSelectedOption }) {
  
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? options
      : options.filter((item) => {
          return item.nombre.toLowerCase().includes(query.toLowerCase());
        });


  return (
    <Combobox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative">
        <Combobox.Input
         name="nombre"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={placeholder}
          className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          displayValue={(item) => item.nombre}

        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
      </div>

      <Combobox.Options className="absolute mt-1 max-h-60 w- overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {filteredData.map((item) => (
          <Combobox.Option key={item._id} value={item}>
            {item.nombre} <span className="italic">{"$" + item.precio}</span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
