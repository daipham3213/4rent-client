import React from 'react';

import classNames from 'classnames';

import { string2Color } from '@utils';

import { IAvatar } from './avatar';

function stringAvatar(name: string, style?: React.CSSProperties) {
  return {
    backgroundColor: string2Color(name),
    ...style,
  };
}

const Avatar: React.FC<IAvatar> = ({
  src,
  alt,
  color,
  children,
  variant,
  size,
  className,
  style,
  ...rest
}) => {
  const slitName = (name: string) => {
    const first = name.split(' ')[0] ?? '';
    const last = name.split(' ')[1] ?? '';
    return `${first[0] ? first[0] : ''}${last ? last[0] : ''}`;
  };

  const background = () =>
    typeof children === 'string' ? stringAvatar(children, style) : undefined;

  const variants = classNames(
    { 'rounded-full': !variant || variant === 'circle' },
    { 'rounded-lg': variant === 'rounded' },
    { '': variant === 'square' }
  );

  const wrapper = classNames(
    'flex justify-center items-center text-xl text-white bg-transparent pt-0 py-0.5',
    { 'w-[50px] h-[50px]': !size || size === 'default' },
    { 'w-8 h-8': size === 'small' },
    { 'w-4 h-4': size === 'tiny' },
    { 'w-16 h-16': size === 'large' },
    variants
  );

  const renderChildren = () => {
    if (!src) {
      if (typeof children === 'string') {
        return slitName(children);
      }
      return children;
    }
    return undefined;
  };
  return (
    <div className={classNames(wrapper, className)} {...rest}>
      {src ? <img className={variants} src={src} alt={alt} /> : null}
      <span
        className={classNames(
          'w-full h-full flex items-center justify-center',
          variants
        )}
        style={
          !color && !src ? background() : { backgroundColor: color, ...style }
        }
      >
        {renderChildren()}
      </span>
    </div>
  );
};

export default Avatar;
