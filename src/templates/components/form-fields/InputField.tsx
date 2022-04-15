import React from 'react';

import { Control, useController } from 'react-hook-form';

import { IInput } from '@/components/input/input';
import { Input } from '@components';

export interface IInputField extends IInput {
  name: string;
  control: Control<any>;
  variant?: 'fluent' | 'metro';
  isFocus?: boolean;
}

const InputField = ({
  name,
  control,
  label,
  helperText: _,
  ...rest
}: IInputField) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      ref={ref}
      isError={invalid}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default InputField;
