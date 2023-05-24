import React, { useState, useRef, useEffect } from "react";
import {
  StrictValidNumber,
  strictValidString,
  validObjectWithKeys,
} from "../../../utils/commonUtils";
import Transition from "../../../utils/Transition";
import Api from "../../../utils/api";

function DropdownFull({
  label,
  options: initialOptions = [],
  api,
  field,
  onSelect = () => {},
}) {
  const { onChange, value: selected = {}, name } = field;
  console.log(name, selected);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [timeOutId, setTimeoutId] = useState(null);
  const [options, setOptions] = useState(initialOptions);

  const getOptions = async (val) => {
    try {
      const res = await Api.get(`${api}?key=${val}`);
      setOptions([
        ...res.data.options.map((v) => ({ value: v._id, label: v.name, ...v })),
        { value: null, label: "Add new" },
      ]);
      setDropdownOpen(true);
    } catch (error) {}
  };

  const getOptionsss = (val) => {
    if (!api) return;
    if (timeOutId) clearTimeout(timeOutId);
    if (val) {
      const timeOut = setTimeout(() => {
        getOptions(val);
      }, 1000);
      setTimeoutId(timeOut);
    } else {
      setTimeoutId(null);
    }
  };

  useEffect(() => {
    onBlurInput();
  }, [selected]);

  const onBlurInput = () => {
    if (validObjectWithKeys(selected, ["value", "label"])) {
      setInputValue(selected.label);
    }
  };

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1" htmlFor="default">
        {label}
      </label>
      <div
        ref={trigger}
        className="form-input w-full flex"
        aria-label="Select date range"
        aria-haspopup="true"
        onClick={() => options.length > 1 && setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <input
          className="w-5/6"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            getOptionsss(e.target.value);
          }}
          onBlur={onBlurInput}
        />
        <svg
          className="shrink-0 ml-1 fill-current text-slate-400"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </div>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="z-10 absolute top-full left-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-sm text-slate-600 divide-y divide-slate-200"
          // onFocus={() => setDropdownOpen(true)}
          // onBlur={() => setDropdownOpen(false)}
        >
          {options.map((option) => {
            return (
              <button
                key={option.value}
                type="button"
                tabIndex="0"
                className={`flex items-center justify-between w-full hover:bg-slate-50 py-2 px-3 cursor-pointer ${
                  option.value === selected.value && "text-indigo-500"
                }`}
                onClick={() => {
                  onChange(option);
                  setDropdownOpen(false);
                  setInputValue(option.label);
                  onSelect(option);
                }}
              >
                <span>{option.label}</span>
                <svg
                  className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                    option.value !== selected.value && "invisible"
                  }`}
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                </svg>
              </button>
            );
          })}
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFull;
