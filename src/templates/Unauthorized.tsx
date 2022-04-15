import React, { ReactNode } from 'react';

import { AppConfig } from '@utils';

type IUnauthorizedProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Unauthorized = ({ meta, children }: IUnauthorizedProps) => {
  return (
    <div className="main h-full w-full px-1 antialiased">
      {meta}
      <div className="mx-auto">
        {children}
        <div className="absolute bottom-1 left-1 text-center text-sm text-gray-500">
          © Copyright {new Date().getFullYear()} {AppConfig.title}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
