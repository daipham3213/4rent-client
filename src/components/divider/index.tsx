import React from 'react';

import classNames from 'classnames';

import { IDivider } from './divider';

const Divider = ({
  variants,
  fontWeight,
  label,
  size,
  lineStyle,
  textStyle,
}: IDivider) => {
  return (
    <div
      {...lineStyle}
      className={classNames(
        'relative flex items-center w-full border-b-2 border-gray-300 my-2 dark:border-gray-500',
        { 'justify-start': !variants || variants === 'start' },
        { 'justify-center': variants === 'middle' },
        { 'justify-end': variants === 'end' },
        lineStyle?.className
      )}
    >
      <span
        {...textStyle}
        className={classNames(
          'absolute bg-white dark:bg-gray-800 dark:text-gray-500 px-2',
          { 'font-semibold': fontWeight === 'bold' },
          { 'text-sm': size === 'small' },
          { 'text-lg': size === 'large' },
          { 'text-md': size === 'default' || !size },
          textStyle?.className
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default Divider;
