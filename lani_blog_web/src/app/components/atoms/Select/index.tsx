import classNames from "classnames";
import { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const borderStyles = {
  default:
    "focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:border-2 border-gray-300",
  error:
    "border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500",
};

export interface SelectProps {
  label?: string | React.ReactNode;
  options: Array<{
    label: string;
    value: string;
  }>;
  value?: string;
  onChanged?: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
  containerClassName?: string;
}

const Select: React.FunctionComponent<SelectProps> = ({
  label,
  options,
  value,
  isError,
  errorMessage,
  onChanged,
  containerClassName,
}) => {
  const selectedItem = options?.find((x) => x.value === value);
  return (
    <div className={containerClassName}>
      <Listbox
        value={value}
        onChange={(updatedValue) => onChanged && onChanged(updatedValue)}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </Listbox.Label>
            )}
            <div className="relative">
              <Listbox.Button
                className={classNames(
                  "h-10 bg-white relative w-full rounded-md border shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:ring-1 sm:text-sm",
                  {
                    [borderStyles.error]: isError,
                    [borderStyles.default]: !isError,
                  }
                )}
              >
                <span className="block truncate">{selectedItem?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options?.map((option) => (
                    <Listbox.Option
                      key={option.label}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-gray-100" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5 text-primary-600"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
              {isError && errorMessage && (
                <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
              )}
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
