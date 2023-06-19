import React from "react";
import { Control, Controller } from "react-hook-form";

import Select, { SelectProps } from "../../atoms/Select";

export interface FormSelectProps extends SelectProps {
  control?: Control<any>
  name: string
  defaultValue?: string
  error?: any
  controllerProps?: any
}

const FormSelect = ({
  controllerProps,
  control,
  name,
  defaultValue,
  error,
  ...rest
}: FormSelectProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          {...rest}
          value={value}
          onChanged={onChange}
          isError={!!error}
          errorMessage={error?.message}
        />
      )}
      name={name}
      defaultValue={defaultValue}
      {...controllerProps}
    />
  );
};

export default FormSelect;
