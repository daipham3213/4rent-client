import React, { ReactNode } from 'react';

import { useTheme } from 'next-themes';

import useAuth from '@/services/authentication/useAuth';
import Icon from '@/templates/components/icon';
import { useOnScroll } from '@hooks';

import { Header, Sidebar } from './components';
import { ISidebarItem } from './components/sidebar/sidebar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  showHeader?: boolean;
};

const items: ISidebarItem[] = [
  {
    icon: (value) => <Icon name="HomeIcon" outline={!value} />,
    title: 'Home',
    active: true,
  },
  {
    icon: (value) => <Icon name="UserIcon" outline={!value} />,
    title: 'Profile',
  },
  {
    icon: (value) => <Icon name="ArchiveIcon" outline={!value} />,
    title: 'Saved posts',
  },
  {
    icon: (value) => <Icon name="ClockIcon" outline={!value} />,
    title: 'Recently posts',
  },
];
const Main = (props: IMainProps) => {
  const [visible, setVisible] = React.useState<boolean>(true);

  const { data: user } = useAuth();
  const MemoSidebar = React.useCallback(
    () => <Sidebar items={items} activeUser={user} />,
    [user]
  );

  const { resolvedTheme: theme, setTheme } = useTheme();
  const scroll = useOnScroll();

  const isDark = theme === 'dark';
  const handleChangeTheme = () => setTheme(theme !== 'dark' ? 'dark' : 'light');

  React.useEffect(() => {
    setVisible(!(scroll.y > 151 && scroll.y - scroll.lastY > 0));
  }, [scroll]);

  return (
    <div className="main w-full text-gray-700 antialiased">
      {props.meta}
      <Header
        isDark={isDark}
        visible={visible}
        onChangeTheme={handleChangeTheme}
      />
      <div className="flex w-full flex-row items-center">
        <div className="grid grid-cols-8 md:px-10 lg:px-32">
          {/* Sidebar */}
          <div className="hidden py-5 pr-5 md:col-start-1 md:block xl:col-span-2">
            <MemoSidebar />
          </div>
          {/* Main section */}
          <div className="col-span-8 col-start-1 p-5 text-xl md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-3">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Main };
