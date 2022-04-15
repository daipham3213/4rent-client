import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IButton } from './button';

const Button: React.FC<IButton> = ({
  children,
  size,
  status,
  variant,
  fullWidth,
  onClick,
  disabled,
  className,
  type,
  ...rest
}) => {
  const btnSize = classNames(
    { 'h-11 text': size === 'large' },
    { 'h-6 text-xs': size === 'small' },
    { 'h-8 text-sm': size === 'default' || !size }
  );

  const btnStatus = classNames(
    'focus:ring-2',
    {
      'focus:ring-primary-300 dark:focus:ring-primary-400':
        status === 'primary' || !status,
    },
    {
      'focus:ring-success-300 dark:focus:ring-success-400':
        status === 'success',
    },
    { 'focus:ring-info-200 dark:focus:ring-info-400': status === 'info' },
    {
      'focus:ring-warning-200 dark:focus:ring-warning-400':
        status === 'warning',
    },
    { 'focus:ring-danger-200 dark:focus:ring-danger-400': status === 'danger' }
  );

  const btnFilled = classNames(
    'text-gray-100 dark:text-gray-200',
    {
      'bg-primary-500 dark:bg-primary-600 active:bg-primary-600 dark:active:bg-primary-700':
        status === 'primary' || !status,
    },
    {
      'bg-success-500 dark:bg-success-600 active:bg-success-600 dark:active:bg-success-700':
        status === 'success',
    },
    {
      'bg-info-500 dark:bg-info-600 active:bg-info-600 dark:active:bg-info-700':
        status === 'info',
    },
    {
      'bg-warning-400 dark:bg-warning-600 active:bg-warning-600 dark:active:bg-warning-700':
        status === 'warning',
    },
    {
      'bg-danger-500 dark:bg-danger-600 active:bg-danger-600 dark:active:bg-danger-700':
        status === 'danger',
    }
  );

  const btnOutlined = classNames(
    'border-2',
    {
      'text-primary-400 border-primary-400 dark:border-primary-500':
        status === 'primary' || !status,
    },
    { 'text-info-400 border-info-400 dark:border-info-500': status === 'info' },
    {
      'text-success-400 border-success-400 dark:border-success-500':
        status === 'success',
    },
    {
      'text-warning-400 border-warning-400 dark:border-warning-500':
        status === 'warning',
    },
    {
      'text-danger-400 border-danger-400 dark:border-danger-500':
        status === 'danger',
    }
  );

  const btnGhost = classNames(
    {
      'text-primary-400 dark:text-primary-500': status === 'primary' || !status,
    },
    { 'text-success-400 dark:text-success-500': status === 'success' },
    { 'text-info-400 dark:text-info-500': status === 'info' },
    { 'text-warning-400 dark:text-warning-500': status === 'warning' },
    { 'text-danger-400 dark:text-danger-500': status === 'danger' }
  );

  const btnDisable = classNames(
    { 'bg-gray-400 dark:bg-gray-500': variant === 'filled' || !variant },
    { 'text-gray-500 dark:text-gray-600': variant === 'ghost' },
    {
      'border-2 text-gray-500 border-gray-400 dark:border-gray-500':
        variant === 'outlined',
    }
  );

  const button = classNames(
    'flex items-center justify-center text-center focus:ring-opacity-80 font-medium w-full rounded-lg drop-shadow-md',
    btnSize,
    disabled
      ? btnDisable
      : classNames(
          'active:shadow-lg transition duration-150 ease-in-out',
          variant !== 'ghost' ? btnStatus : null,
          variant === 'outlined' ? btnOutlined : null,
          variant === 'ghost' ? btnGhost : null,
          !variant || variant === 'filled' ? btnFilled : null
        ),
    className
  );

  const handleClick = (event: any) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={classNames('my-2 ignore', {
        'w-fit': !fullWidth,
        'w-full': fullWidth,
      })}
    >
      <motion.div
        whileHover={!disabled ? { scale: 1.01 } : undefined}
        whileTap={{ scale: 1 }}
      >
        <button
          className={button}
          onClick={handleClick}
          type={type ?? 'button'}
          {...rest}
        >
          {typeof children === 'string' ? (
            <p className="px-3 py-1">{children}</p>
          ) : (
            <>{children}</>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default Button;
