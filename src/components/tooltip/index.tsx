import React from 'react';

import { Transition } from '@headlessui/react';
import classNames from 'classnames';

import { ITooltip } from './tooltip';

const Tooltip: React.FC<ITooltip> = ({
  children,
  message,
  top,
  left,
  right,
  bottom,
  className,
  ...rest
}) => {
  const [show, setShow] = React.useState(false);

  const handleOnMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (rest.onMouseOver) rest.onMouseOver(event);
    setShow(true);
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (rest.onMouseLeave) rest.onMouseLeave(event);
    setShow(false);
  };

  return (
    <div
      className={classNames(
        'relative flex flex-col justify-center items-center group',
        className
      )}
      onMouseEnter={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      {...rest}
    >
      <React.Fragment>{children}</React.Fragment>
      <Transition
        as={React.Fragment}
        show={show}
        enterFrom={classNames('scale-80 opacity-0 -translate-y-2')}
        enter="transition-all duration-300"
        enterTo="scale-100 opacity-110 translate-y-0"
      >
        <div
          className="absolute flex-col items-center"
          style={{ top, left, right, bottom }}
        >
          <span className="relative z-10 whitespace-nowrap rounded-xl bg-gray-600 p-2 text-xs leading-none text-white shadow-lg">
            {message}
          </span>
        </div>
      </Transition>
    </div>
  );
};

export default Tooltip;
