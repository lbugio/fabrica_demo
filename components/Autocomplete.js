import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const Autocomplete = ({ id, name, options, onChange, value, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onChange({ target: { name, value } });
  };

  const handleSelectOption = (option) => {
    setIsOpen(false);
    setInputValue(option.nombre);
    onChange({ target: { name, value: option.nombre } });
  };

  const filteredOptions = options.filter((option) =>
    option.nombre.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />{" "}
      </div>
      <input
        type="text"
        id={id}
        name={name}
        value={inputValue || value}
        onChange={handleInputChange}
        className="placeholder:italic mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 pr-8"
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="py-1">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className="px-3 py-2 cursor-pointer hover:bg-indigo-400 rounded-md hover:text-white"
                onClick={() => handleSelectOption(option)}
              >
                {option.nombre}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
