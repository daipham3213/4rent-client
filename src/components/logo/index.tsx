import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { AppConfig } from '@utils';

import { ILogo } from './logo';

const Logo = ({ size, showTitle, uri }: ILogo) => {
  const getSize = React.useCallback(() => {
    switch (size) {
      case 'small':
        return 'w-5 h-5';
      case 'large':
        return 'w-16 h-16';
      case 'default':
      case undefined:
      default:
        return 'w-10 h-10';
    }
  }, [size]);

  return (
    <Link href="/" passHref>
      <motion.div
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        whileHover={{ scale: 1.01 }}
        className="flex gap-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          exit={{ opacity: 0, scale: 0.8 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          <img
            src={uri || '/assets/logo.png'}
            className={classNames('h-auto', getSize())}
            alt="logo-c-thru"
          />
        </motion.div>
        {showTitle ? (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="hidden text-sm text-white xl:flex xl:items-center"
          >
            <span className="font-semibold text-primary-500 drop-shadow-md dark:text-gray-300">
              {AppConfig.site_name}
            </span>
          </motion.div>
        ) : null}
      </motion.div>
    </Link>
  );
};
export default Logo;
