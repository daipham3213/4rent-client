import React from 'react';

import FluentInput from './fluent';
import { IInput } from './input';
import MetroInput from './metro';

interface Props extends IInput {
  variant?: 'fluent' | 'metro';
  isFocus?: boolean;
}

const Input = ({ variant, ...rest }: Props) => {
  return variant !== 'metro' ? (
    <FluentInput {...rest} />
  ) : (
    <MetroInput {...rest} />
  );
};

export default Input;
