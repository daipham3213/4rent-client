import React from 'react';

import classNames from 'classnames';

import { IBadge } from './badge';

const Badge: React.FC<IBadge> = ({
  children,
  status,
  variant,
  max = 99,
  showZero,
  badgeContent,
  positionHorizontal,
  positionVertical,
  className,
  ...rest
}) => {
  const background = classNames(
    'absolute rounded-full ring-2 ring-offset-2 ring-white dark:ring-gray-800',
    {
      'bg-primary-400 ring-offset-primary-200': status === 'primary' || !status,
    },
    { 'bg-success-400 ring-offset-success-200 ': status === 'success' },
    { 'bg-info-400 ring-offset-info-200': status === 'info' },
    { 'bg-warning-400 ring-offset-warning-200': status === 'warning' },
    { 'bg-danger-400 ring-offset-danger-200': status === 'danger' }
  );

  const position = classNames(
    { 'top-3/4': positionVertical === 'bottom' },
    { 'bottom-3/4': positionVertical === 'top' || !positionVertical },
    { 'left-3/4': positionHorizontal === 'right' },
    { 'right-3/4': positionHorizontal === 'left' || !positionHorizontal }
  );

  const variants = classNames(
    {
      'flex items-center justify-center px-1 w-auto h-4': variant === 'number',
    },
    { 'w-2 h-2': variant === 'dot' || !variant }
  );

  const getContents = React.useCallback(
    (value?: number) => {
      if (value && value > 0) {
        if (max) {
          return value < max ? `${value}` : `${max}+`;
        }
        return `${value}`;
      }
      if (value && value === 0 && showZero) {
        return `${value}`;
      }
      return '';
    },
    [max, showZero]
  );

  return (
    <div
      className={classNames(
        'relative flex h-fit w-fit items-center justify-center',
        className
      )}
      {...rest}
    >
      {children}
      <div className={classNames(background, position, variants)}>
        {variant === 'number' ? (
          <span className="text-[0.7rem] font-semibold text-white">
            {getContents(badgeContent)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Badge;
