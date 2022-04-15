import React from 'react';

import classNames from 'classnames';

import { ISkeleton } from './skeleton';

const Skeleton: React.FC<ISkeleton> = ({
  children,
  variant,
  animation,
  className,
  style,
  width,
  height,
}) => {
  const wave = () => (
    <div
      className="absolute top-0 -left-full h-full w-10 animate-wave bg-white bg-opacity-50"
      style={{ boxShadow: '0 0 50px 9px rgba(254,254,254)' }}
    />
  );

  const variants = () => {
    if (variant === 'circular') {
      if (!width) {
        return { width: '50px', height: '50px', ...style };
      }
      return { width, height: width, ...style };
    }
    if (variant === 'rectangular') {
      let w = width;
      let h = height;
      if (!w) w = '100%';
      if (!h) h = '100%';
      return { width: w, height: h, ...style };
    }
    return undefined;
  };

  const skeleton = classNames(
    'min-h-fit bg-gray-300 dark:bg-gray-400 overflow-hidden relative py-2 p-2',
    { 'animate-pulse': animation === undefined || animation === 'pulsate' },
    { 'rounded-full': variant === 'circular' },
    { rounded: variant !== 'circular' },
    { 'w-full h-5': !variant || variant === 'text' },
    className
  );

  return (
    <div className={skeleton} style={variants()}>
      {children}
      {animation === 'wave' ? wave() : null}
    </div>
  );
};

export default Skeleton;
