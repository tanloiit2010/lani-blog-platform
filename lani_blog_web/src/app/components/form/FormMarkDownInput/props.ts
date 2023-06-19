import { Control } from 'react-hook-form'
import { MarkDownInputProps } from '../../atoms/MarkDownInput'

export interface FormMarkDownInputProps extends MarkDownInputProps {
  control?: Control<any>
  name: string
  defaultValue?: string
  error?: any
  controllerProps?: any
}
