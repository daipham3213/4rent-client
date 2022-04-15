import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IInput } from './input';

const MetroInput: React.FC<
  Omit<IInput, 'status' | 'size'> & { isFocus?: boolean }
> = ({
  isError,
  helperText,
  name,
  label,
  className,
  accessory,
  onChange,
  onFocus,
  onBlur,
  type,
  isFocus,
  ...rest
}) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string | number>();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    const val = e.target.value.length > 0;
    setFocus(val);
    setValue(e.target.value);
  };

  const notFocus = 'top-1/4 left-2 text-gray-500';
  const inFocus =
    'left-3 -translate-y-1/2 bg-white dark:bg-gray-700 px-1 text-xs text-primary-500';
  const labelStyled = classNames(
    'absolute duration-100',
    focus || isFocus ? inFocus : notFocus
  );

  const inputStyles = classNames(
    className,
    'w-full min-h-[40px] p-2 rounded shadow border-0 ring-2 dark:ring-gray-400 dark:border-gray-700 dark:bg-gray-700',
    { 'ring-1 ring-danger-400 ring-1 ring-danger-400': isError }
  );

  return (
    <motion.div
      animate={isError ? { x: [-5, 0, 5, 0] } : { x: 0 }}
      transition={{ type: 'spring', duration: 0.1, repeat: 3 }}
      className="relative my-2 w-full"
    >
      <div className="relative rounded dark:bg-gray-700">
        <label htmlFor={name} className={labelStyled}>
          {label}
        </label>
        <input
          name={name}
          onFocus={(e) => {
            setFocus(true);
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            if (!value) {
              setFocus(false);
            }
            if (onBlur) {
              onBlur(e);
            }
          }}
          onChange={handleTextChange}
          className={inputStyles}
          type={type ?? 'text'}
          {...rest}
        />
        {accessory ? (
          <div className="absolute top-1 right-1 h-8 w-8 text-gray-400">
            <div className="flex h-full w-full items-center justify-center">
              {accessory}
            </div>
          </div>
        ) : null}
      </div>
      {isError ? (
        <div className="mt-1 mr-2 flex flex-row-reverse text-xs">
          <span className="text-danger-500 dark:text-danger-500">
            {helperText}
          </span>
        </div>
      ) : null}
    </motion.div>
  );
};

export default MetroInput;
