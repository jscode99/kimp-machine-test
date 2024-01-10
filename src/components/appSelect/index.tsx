import React, { useState, useRef, ChangeEvent, useEffect } from "react";
// Styles
import "./appSelect.css";

type ISelectOptionProps = {
  options: string[];
  selectedValue: string;
  onOptionChange: (value: string) => void;
};

export default function AppSelect({
  options,
  selectedValue,
  onOptionChange,
}: ISelectOptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      // Re-setting options to its initial state
      setFilteredOptions(options);
    }
  }, [isOpen, options]);

  // To handle the outside mouse event.
  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Registered an event listener for the 'mousedown event.
    document && document.addEventListener("mousedown", handleClickOutside);

    // Removes the event listener to avoid memory leaks & to trigger the callback to close the select options.
    return () => {
      document && document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onHandleSelect = () => {
    setIsOpen((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onHandleOption = (value: string) => {
    onOptionChange(value);
    setIsOpen(false);
  };

  // To handle the search functionality.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(query),
    );
    setFilteredOptions(filteredOptions);
  };

  return (
    <div className="app__select" ref={selectRef}>
      <div
        className={`select__container ${isOpen ? "open" : ""}`}
        onClick={onHandleSelect}
      >
        {selectedValue || "Select an option"}
      </div>
      {isOpen && (
        <div className="options__container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search options...."
            onChange={handleInputChange}
          />
          <ul>
            {filteredOptions?.map((optionItem) => (
              <li key={optionItem} onClick={() => onHandleOption(optionItem)}>
                {optionItem}
              </li>
            ))}
            {filteredOptions.length === 0 ? (
              <div className="no__options">No options available.</div>
            ) : (
              false
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
