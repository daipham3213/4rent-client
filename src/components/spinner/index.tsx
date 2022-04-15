import React from 'react';

import classNames from 'classnames';

import { ISpinner } from './spinner';

const Spinner: React.FC<ISpinner> = ({ status, size, children }) => {
  const statusSpin = classNames(
    {
      'border-primary-400 dark:border-primary-500':
        !status || status === 'primary',
    },
    { 'border-success-400 dark:border-success-500': status === 'success' },
    { 'border-info-400 dark:border-info-500': status === 'info' },
    { 'border-warning-400 dark:border-warning-500': status === 'warning' },
    { 'border-danger-400 dark:border-danger-500': status === 'danger' }
  );

  const sizes = classNames(
    { 'w-8 h-8': !size || size === 'default' },
    { 'w-6 h-6': size === 'small' },
    { 'w-12 h-12': size === 'large' }
  );

  const spinner = classNames(
    'inline-block rounded-full animate-spin border-2 border-r-gray-400 dark:border-r-gray-400',
    sizes,
    statusSpin
  );

  return (
    <div className="relative flex items-center justify-center">
      <div className={spinner} role="status" />
      <span className="absolute text-xs">{children}</span>
    </div>
  );
};

export default Spinner;
