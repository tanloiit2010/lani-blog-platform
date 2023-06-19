import { Control } from "react-hook-form";
import React from "react";
import { Controller } from "react-hook-form";
import Input, { InputProps } from "../../atoms/Input";


interface FormInputProps extends InputProps {
  control?: Control<any>;
  name: string;
  defaultValue?: string;
  error?: any;
  controllerProps?: any;
}

const FormInput = ({
  controllerProps,
  control,
  name,
  defaultValue,
  error,
  ...rest
}: FormInputProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          {...rest}
          value={value as string}
          onBlur={onBlur}
          onChangeText={onChange}
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

export default FormInput;
