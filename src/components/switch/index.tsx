import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { ISwitch } from './switch';

const Switch: React.FC<ISwitch> = ({
  checked,
  onChecked,
  accessory,
  size,
  status,
}) => {
  const dotSize = classNames(
    'relative bg-white dark:bg-gray-700 rounded-full shadow-md transform',
    { 'w-5 h-5': size === 'small' },
    { 'w-9 h-9': size === 'large' },
    { 'w-7 h-7': size === 'default' || !size }
  );

  const dotMotion = checked ? '100%' : -3;

  const backgroundStatus = classNames(
    { 'bg-primary-400 dark:bg-primary-500': status === 'primary' || !status },
    { 'bg-success-400 dark:bg-success-500': status === 'success' },
    { 'bg-info-400 dark:bg-info-500': status === 'info' },
    { 'bg-warning-400 dark:bg-warning-500': status === 'warning' },
    { 'bg-danger-400 dark:bg-danger-500': status === 'danger' }
  );

  const background = classNames(
    'flex items-center rounded-full mx-3 px-1 drop-shadow-md dark:bg-opacity-90',
    { 'w-12 h-6': size === 'small' },
    { 'w-20 h-10': size === 'large' },
    { 'w-16 h-8': size === 'default' || !size },
    checked ? backgroundStatus : 'bg-gray-200'
  );

  const handleClick = () => {
    onChecked(checked);
  };

  return (
    <div className="m-2 flex items-center justify-center">
      <div onClick={handleClick} className={background}>
        <motion.div
          animate={{ x: dotMotion }}
          transition={{
            type: 'spring',
            duration: 0.2,
            damping: 30,
            stiffness: 700,
          }}
          className={dotSize}
        >
          {accessory ? (
            <span className="h-auto w-auto">{accessory()}</span>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default Switch;
