import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { Divider } from '@components';

import { IDivider } from '../divider/divider';
import {
  ISidebar,
  ISidebarBody,
  ISidebarContext,
  ISidebarFooter,
  ISidebarHeader,
} from './sidebar';

const SidebarContext = React.createContext<ISidebarContext>({
  isCollapsed: true,
  isHidden: false,
  variants: 'minimal',
  onCollapseState: () => {},
  onHiddenState: () => {},
});

const useSideBarContext = (): ISidebarContext => {
  const [isCollapsed, setCollapse] = React.useState<boolean>(true);
  const [isHidden, setHidden] = React.useState<boolean>(false);

  const onCollapseState = (state: boolean) => setCollapse(state);
  const onHiddenState = (state: boolean) => setHidden(state);

  return {
    isCollapsed,
    onCollapseState,
    onHiddenState,
    isHidden,
  };
};

const renderChildren = (args: ISidebarContext, children: any) => {
  if (typeof children === 'function') {
    return children(args);
  }
  return children;
};

const renderDivider = (divider?: IDivider) => {
  if (divider) {
    const { textStyle, lineStyle, ...divs } = divider;
    return (
      <Divider
        textStyle={{ className: 'bg-gray-300 text-sm', ...textStyle }}
        lineStyle={{ className: 'border-gray-500', ...lineStyle }}
        {...divs}
      />
    );
  }
  return React.Fragment;
};

const Context: React.FC<ISidebar> = ({
  children,
  position,
  className,
  topOffset = '6rem',
  leftOffset,
  rightOffset,
  style,
  variants,
  isCollapsed,
  isHidden,
  onHiddenState,
  onCollapseState,
  ...rest
}) => {
  const values = useSideBarContext();

  const handleToggle = () => {
    if (values.onCollapseState) {
      values.onCollapseState(!values.isCollapsed ?? true);
    }
  };

  const toggleButton = () => {
    return (
      <React.Fragment>
        <div className="h-5 w-5 dark:text-gray-300" onClick={handleToggle}>
          {values.isCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </div>
      </React.Fragment>
    );
  };

  return (
    <SidebarContext.Provider value={values}>
      <aside
        className={classNames(
          'sticky w-full min-w-[6rem] min-h-fit',
          {
            'float-left': !position || position === 'left',
            'float-right': position === 'right',
            'grid-cols-1': values.isCollapsed,
            'grid-cols-4': !values.isCollapsed,
          },
          className
        )}
        style={{
          top: topOffset,
          left: leftOffset,
          right: rightOffset,
          ...style,
        }}
        {...rest}
      >
        <div className="relative grid grid-cols-5">
          <div className="col-span-4 min-h-[4rem] min-w-[60px] rounded-r-lg bg-gray-300 pr-1 dark:bg-gray-600">
            {children}
          </div>
          <div
            className={classNames(
              'col-end-5 absolute top-1/4 -right-5 p-1',
              'bg-primary-300 rounded-full border-2 border-white dark:border-gray-800'
            )}
          >
            {toggleButton()}
          </div>
        </div>
        <div className="col-span-5" />
      </aside>
    </SidebarContext.Provider>
  );
};

const Header: React.FC<ISidebarHeader> = ({ children, className, ...rest }) => {
  const { isHidden, isCollapsed, ...props } = React.useContext(SidebarContext);

  return (
    <React.Fragment>
      {children ? (
        <div
          className={classNames(
            'flex justify-start items-center py-2 px-2 my-3',
            className
          )}
          {...rest}
        >
          {renderChildren({ isHidden, isCollapsed, ...props }, children)}
        </div>
      ) : null}
    </React.Fragment>
  );
};

const Body: React.FC<ISidebarBody> = ({
  children,
  className,
  divider,
  ...props
}) => {
  const { ...args } = React.useContext(SidebarContext);

  return (
    <React.Fragment>
      {children ? (
        <React.Fragment>
          {renderDivider(divider)}
          <div className={classNames('my-5', className)} {...props}>
            {renderChildren(args, children)}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const Footer: React.FC<ISidebarFooter> = ({
  children,
  divider,
  className,
  ...props
}) => {
  const { ...args } = React.useContext(SidebarContext);

  return (
    <React.Fragment>
      {children ? (
        <React.Fragment>
          {renderDivider(divider)}
          <div className={classNames('', className)} {...props}>
            {renderChildren(args, children)}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const Sidebar = {
  Context,
  Header,
  Body,
  Footer,
};

export default Sidebar;
