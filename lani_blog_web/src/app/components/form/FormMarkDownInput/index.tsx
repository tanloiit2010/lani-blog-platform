import React from 'react'
import { Controller } from 'react-hook-form'

import { FormMarkDownInputProps } from './props'
import MarkDownInput from '../../atoms/MarkDownInput'

const FormMarkDownInput = ({
  controllerProps,
  control,
  name,
  defaultValue,
  error,
  ...rest
}: FormMarkDownInputProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <MarkDownInput
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
  )
}

export default FormMarkDownInput
