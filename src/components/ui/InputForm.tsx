import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
// import {Control} from 'react-hook-form/dist/types'
import { Input } from './input'
import { PasswordInput } from './password-input'

interface Props {
  name: string
  placeholder: string
  control: any
  type?: string
  title?: string
  //   control: Control<
  //     {
  //       username: string;
  //       email: string;
  //       password: string;
  //     },
  //     any
  //   >;
}
function InputForm({ type, title, name, placeholder, control }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {type === 'pass' ? (
              <PasswordInput placeholder="*********" {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputForm
