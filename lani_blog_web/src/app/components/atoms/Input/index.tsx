import classNames from "classnames";
import { ChangeEvent } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  labelClassNames?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  inputSize?: "default" | "sm";
  placeHolder?: string;
  isError?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  isMultipleLine?: boolean;
  onChangeText?: (value: string) => void;
}

const borderStyles = {
  default:
    "focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:border-2 border-gray-300",
  error:
    "border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500",
};

const Input: React.FunctionComponent<InputProps> = ({
  label,
  labelClassNames,
  value,
  onChangeText,
  disabled = false,
  placeHolder,
  isError = false,
  errorMessage,
  containerClassName,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onChangeText && onChangeText(value);
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label
          className={classNames(
            "mb-1 block text-sm font-medium text-gray-700",
            labelClassNames
          )}
        >
          {label}
        </label>
      )}
      <div>
        <input
          disabled={disabled}
          value={value}
          className={classNames(
            "px-3 py-2 shadow-sm block w-full sm:text-sm rounded-md border placeholder-gray-400",
            {
              [borderStyles.error]: isError,
              [borderStyles.default]: !isError,
            }
          )}
          onChange={handleChange}
          placeholder={placeHolder}
          {...rest}
        />
      </div>
      {isError && errorMessage && (
        <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
