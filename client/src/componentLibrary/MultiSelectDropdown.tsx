import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import combineClassNames from "./utils/combineClassNames";

export interface MultiSelectOption<T = string> {
  value: T;
  label: string;
}

interface MultiSelectDropdownProps<T> {
  options: MultiSelectOption<T>[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value: MultiSelectOption<T>[];
  onChange: (value: MultiSelectOption<T>[]) => void;
}

export default function MultiSelectDropdown<T>({
  options,
  label,
  required,
  placeholder = "Select options...",
  disabled = false,
  value,
  onChange,
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: MultiSelectOption<T>) => {
    if (disabled) return;
    const newSelectedOptions = value.find((item) => item.value === option.value)
      ? value.filter((item) => item.value !== option.value)
      : [...value, option];

    onChange(newSelectedOptions);
  };

  const removeOption = (option: MultiSelectOption<T>) => {
    if (disabled) return;
    const newSelectedOptions = value.filter(
      (item) => item.value !== option.value
    );

    onChange(newSelectedOptions);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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
    <div className="flex flex-col w-full">
      {label && (
        <label className="font-semibold">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <div
          className={combineClassNames([
            "w-full p-2 border-2 border-gray-500 focus-within:border-blue-400 rounded-md flex-grow cursor-pointer flex items-center flex-wrap overflow-y-auto",
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
            isOpen ? "border-blue-400" : "",
          ])}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {value.length > 0 ? (
            value.map((option, i) => (
              <span
                key={`${option.value}_${i}`}
                className={`bg-green px-2 py-1 rounded-full flex items-center mr-2 mb-1 ${
                  disabled ? "bg-gray-300 text-gray-500" : "text-white"
                }`}
              >
                {option.label}
                {!disabled && (
                  <XMarkIcon
                    className="ml-1 w-3 h-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option);
                    }}
                  />
                )}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        {isOpen && !disabled && (
          <div className="absolute z-10 w-full bg-white border-2 border-gray-500 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
            {options.map((option, i) => (
              <div
                key={`${option.value}_${i}`}
                onClick={() => toggleOption(option)}
                className={`cursor-pointer px-4 py-2 ${
                  value.find((item) => item.value === option.value)
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
