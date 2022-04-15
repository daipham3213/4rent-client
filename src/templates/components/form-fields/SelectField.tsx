import React from 'react';

import { Control, useController } from 'react-hook-form';

import { ISelect } from '@/components/select/select';
import { Select } from '@components';

export interface ISelectField<T>
  extends Omit<ISelect<T>, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
}

function SelectField<T>({ name, label, control, ...rest }: ISelectField<T>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      value={value}
      onChange={(val) => onChange(val)}
      onBlur={onBlur}
      label={label}
      isError={invalid}
      helperText={error?.message}
      {...rest}
    />
  );
}

export default SelectField;
