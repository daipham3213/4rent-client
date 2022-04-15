import React from 'react';

import classNames from 'classnames';

import { ICheckbox } from './checkbox';

const Checkbox: React.FC<ICheckbox> = ({
  name,
  label: lab,
  onChecked,
  containerProps,
  labelProps,
  checked,
  className,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChecked) {
      onChecked(e.target.checked);
    }
  };

  const label = () => {
    const value = '';
    if (!labelProps)
      return {
        className: value,
      };
    const { className: labelClass, ...props } = labelProps;
    return {
      className: classNames(value, labelClass),
      ...props,
    };
  };

  const container = () => {
    const value =
      'flex flex-rows gap-2 items-center justify-center text-sm text-gray-700';
    if (!containerProps)
      return {
        className: value,
      };
    const { className: containerClass, ...props } = containerProps;
    return {
      className: classNames(value, containerClass),
      ...props,
    };
  };
  return (
    <label htmlFor={name} {...container()}>
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        onChange={handleChange}
        className={classNames('rounded', className)}
        {...rest}
      />
      {lab ? <p {...label()}>{lab}</p> : null}
    </label>
  );
};

export default Checkbox;
