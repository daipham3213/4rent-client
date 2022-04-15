import React from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { motion, Variants } from 'framer-motion';

import { Switch as SWUI } from '@components';

import { IThemeChanger } from './theme-changer';

const iconsVariants: Variants = {
  sun: { rotate: -360, scale: [1, 0.8, 1] },
  moon: { rotate: 360, scale: [1, 0.8, 1] },
};

const ThemeChanger = ({ isDark, onChangeTheme }: IThemeChanger) => {
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const renderIcon = () => (
    <motion.div
      variants={iconsVariants}
      initial={{ scale: 0.9, rotate: 0 }}
      animate={!isDark ? 'sun' : 'moon'}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{
        x: isDark ? '-5%' : '5%',
        transition: { duration: 0.2 },
      }}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </motion.div>
  );

  return (
    <SWUI checked={isDark} onChecked={onChangeTheme} accessory={renderIcon} />
  );
};

export default ThemeChanger;
