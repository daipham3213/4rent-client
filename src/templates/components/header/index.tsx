import React from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { Logo } from '@components';
import { useOutsideClick } from '@hooks';

import ThemeChanger from '../theme-changer';
import { IHeader, ISearch } from './header';

const SearchBox: React.FC<ISearch> = ({
  keywords,
  onKeywordChange,
  active,
  onActive,
  className,
  ref,
  ...rest
}) => {
  const refObject = React.useRef<HTMLDivElement>(null);

  const handleActive = React.useCallback(() => {
    const noKeyword = (keywords && keywords.length === 0) || !keywords;
    if (((noKeyword && active) || !active) && onActive) {
      onActive();
    }
  }, [keywords, active]);

  useOutsideClick((ref ?? refObject) as any, () => {
    if (active) {
      handleActive();
    }
  });

  return (
    <div
      className={classNames(
        'flex flex-row gap-2 h-full items-center w-full',
        className
      )}
      ref={ref ?? refObject}
      {...rest}
    >
      <div
        className="flex items-center rounded-full p-0.5 ring-gray-500 hover:scale-105 hover:ring-1"
        onClick={handleActive}
      >
        <SearchIcon className="h-6 w-6" />
      </div>
      <motion.span
        initial={{ height: 0, opacity: 0 }}
        animate={
          active ? { height: '100%', opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="invisible h-full border-r border-gray-400 dark:border-gray-500 md:visible"
      />
      <label
        className="invisible relative md:visible"
        htmlFor="search-box"
        placeholder="What are you looking for?"
      >
        <motion.input
          type="text"
          name="search-box"
          placeholder={active ? 'What are u looking for?' : ''}
          className="w-full rounded-full border-0 text-sm text-gray-800 ring-2 dark:bg-gray-700 dark:ring-gray-500"
          value={keywords}
          onChange={onKeywordChange}
          initial={{ width: 0, opacity: 0 }}
          hidden={!active}
          animate={
            active
              ? { width: 'max-content', opacity: [0, 1] }
              : { width: 0, opacity: [0.3, 0] }
          }
          transition={{ duration: 0.2 }}
        />
      </label>
    </div>
  );
};
const Header: React.FC<IHeader> = ({
  isDark = false,
  visible = true,
  onChangeTheme,
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [keywords, setKeywords] = React.useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeywords(e.target.value);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <nav
      className={classNames(
        'z-50 sticky m-1 rounded-lg bg-gray-300 p-1 dark:bg-gray-600 bg-opacity-80 duration-300',
        { 'translate-y-0 opacity-100 scale-100 top-1': visible },
        { '-translate-y-full opacity-0 scale-90 top-0': !visible }
      )}
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 flex items-center justify-start pl-2 md:col-span-1 lg:pl-5">
          <Logo showTitle />
        </div>
        <div className="col-span-6 grid grid-cols-2 items-center justify-start md:col-span-9">
          <SearchBox
            active={active}
            onKeywordChange={handleInputChange}
            keywords={keywords}
            onActive={handleActive}
          />
        </div>
        <div className="col-span-3 flex items-center justify-end md:col-span-2 md:min-w-min">
          <ThemeChanger isDark={isDark} onChangeTheme={onChangeTheme} />
        </div>
      </div>
    </nav>
  );
};
SearchBox.displayName = 'SearchBox';
Header.displayName = 'Header';
export default Header;
