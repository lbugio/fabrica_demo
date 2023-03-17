import { useState } from "react";
import { Listbox, Transition } from '@headlessui/react'
import {ChevronDownIcon } from "@heroicons/react/20/solid";

export function ListBox({ options, selectedOption, onChange}) {



   return (
    <Listbox value={selectedOption} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative mt-1 block w-full border-gray-300 rounded-md bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
           <span className="block truncate">
            {" "}
            {selectedOption.nombre ? selectedOption.nombre : "Eliga una opción"}
          </span> 
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
         <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto border-gray-300 rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-slate-500">
          {options.map((option) => (
            <Listbox.Option
              key={option._id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                }`
              }
              value={option}
            >
              {option.nombre}
            </Listbox.Option>
          ))}
        </Listbox.Options>  
      </Transition>
      </div>
    </Listbox>
  ); 
}

//className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
