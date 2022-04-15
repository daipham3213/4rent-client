import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IInput } from './input';

const FluentInput: React.FC<IInput> = ({
  name,
  status,
  label,
  size: _,
  accessory,
  helperText,
  isError,
  className,
  type,
  ...rest
}) => {
  const background = classNames(
    'flex items-center w-fit font-bold text-center text-gray-200 px-5 rounded-l',
    { 'bg-primary-500 dark:bg-primary-600': status === 'primary' || !status },
    { 'bg-success-500 dark:bg-success-600': status === 'success' },
    { 'bg-info-500 dark:bg-info-600': status === 'info' },
    { 'bg-danger-500 dark:bg-danger-600': status === 'danger' },
    { 'bg-warning-500 dark:bg-warning-600': status === 'warning' }
  );

  const input = classNames(
    'field text-sm border-gray-400 text-gray-600 p-2 px-3 rounded-r w-full',
    'dark:bg-gray-700 dark:border-gray-600',
    'focus:ring-2 focus:border-gray-400 dark:focus:ring-opacity-80',
    {
      'focus:ring-primary-300 dark:focus:ring-primary-400':
        status === 'primary' || !status,
    },
    {
      'focus:ring-success-300 dark:focus:ring-success-400':
        status === 'success',
    },
    { 'focus:ring-info-300 dark:focus:ring-info-400': status === 'info' },
    {
      'focus:ring-warning-300 dark:focus:ring-warning-400':
        status === 'warning',
    },
    { 'focus:ring-danger-300 dark:focus:ring-danger-400': status === 'danger' }
  );

  return (
    <motion.div
      animate={isError ? { x: [-5, 0, 5, 0] } : { x: 0 }}
      transition={{ type: 'spring', duration: 0.1, repeat: 3 }}
      className="relative my-2 flex w-full items-center justify-center"
    >
      <div className="flex text-xs">
        <label htmlFor={name} className={label ? background : 'w-0'}>
          {label}
        </label>
        <input
          className={classNames(
            input,
            { 'ring-2 ring-danger-400 shadow-sm': isError },
            className
          )}
          type={type ?? 'text'}
          {...rest}
        />
        {accessory ? (
          <div className="absolute right-0 h-max min-h-[40px] w-max min-w-[40px]">
            {accessory()}
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

export default FluentInput;
