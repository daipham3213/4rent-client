import React, { ReactNode } from 'react';

import { useTheme } from 'next-themes';

import { Header } from '@/templates/components';
import { useOnScroll } from '@hooks';

interface INonSidebar {
  meta: ReactNode;
  children: ReactNode;
}

const NonSidebar = ({ meta, children }: INonSidebar) => {
  const [visible, setVisible] = React.useState<boolean>(true);

  const { resolvedTheme, setTheme } = useTheme();
  const scroll = useOnScroll();

  const handleChangeTheme = () =>
    setTheme(resolvedTheme !== 'dark' ? 'dark' : 'light');

  React.useEffect(() => {
    setVisible(!(scroll.y > 151 && scroll.y - scroll.lastY > 0));
  }, [scroll]);

  return (
    <div className="main w-full text-gray-700 antialiased">
      {meta}
      <Header
        isDark={resolvedTheme === 'dark'}
        visible={visible}
        onChangeTheme={handleChangeTheme}
      />
      <div className="grid min-h-screen grid-cols-8">
        <div className="col-span-8 md:col-span-6 md:col-start-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NonSidebar;
