import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IProgress } from './progress';

const ProgressBar: React.FC<IProgress> = ({
  progress,
  status,
  showNumber,
  buffer,
}) => {
  const bar = classNames(
    'shadow-lg absolute rounded z-10',
    { 'text-white': progress > 5 },
    { 'h-auto': showNumber, 'h-1': !showNumber },
    { 'bg-primary-400 dark:bg-primary-500': !status || status === 'primary' },
    { 'bg-success-400 dark:bg-success-500': status === 'success' },
    { 'bg-info-400 dark:bg-info-500': status === 'info' },
    { 'bg-warning-400 dark:bg-warning-500': status === 'warning' },
    { 'bg-danger-400 dark:bg-danger-500': status === 'danger' }
  );

  const wrapper = classNames(
    'ignore relative w-full bg-gray-200 dark:bg-gray-400 text-[0.6rem] rounded -z-10',
    { 'h-[0.9rem]': showNumber, 'h-1': !showNumber }
  );

  const buff = classNames(
    'rounded bg-gray-300 dark:bg-gray-500 bg-opacity-90 absolute top-0 left-0 z-0',
    { 'h-[0.9rem]': showNumber, 'h-1': !showNumber }
  );

  return (
    <div className={wrapper}>
      {buffer ? (
        <motion.div
          animate={{ width: `${buffer}%` }}
          transition={{
            type: 'spring',
            duration: 0.5,
            damping: 30,
            stiffness: 700,
          }}
          className={buff}
        />
      ) : null}
      <motion.div
        className={bar}
        animate={{ width: `${progress}%` }}
        transition={{
          type: 'spring',
          duration: 0.5,
          damping: 30,
          stiffness: 700,
        }}
      >
        {showNumber ? (
          <div className="ignore-p h-auto w-full text-center font-semibold">
            {progress}%
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
