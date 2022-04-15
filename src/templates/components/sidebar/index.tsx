import React from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { Avatar, Button, Tooltip } from '@components';

import Icon from '../icon';
import { ISidebar, ISidebarItem } from './sidebar';

const Sidebar: React.FC<ISidebar> = ({ activeUser, items }) => {
  const renderAvatar = () => {
    if (activeUser) {
      const { avatar, lastName, firstName, username, id } = activeUser;
      return (
        <React.Fragment>
          <div
            key={id}
            className="flex flex-row items-center justify-end gap-2 text-sm xl:justify-start"
          >
            <Avatar
              className="duration-300 hover:ring"
              src={avatar}
              alt={`${firstName}-${lastName}`}
            >
              {avatar ? null : `${username}`}
            </Avatar>
            <div className="hidden overflow-hidden xl:flex xl:flex-col">
              <p className="text-clip font-semibold">{`${firstName} ${lastName}`}</p>
              <p className="text-xs text-gray-500">{`@${username}`}</p>
            </div>
          </div>
          <div className="mr-5 hidden h-4 w-4 xl:block">
            <Icon
              name="DotsHorizontalIcon"
              className="duration-500 hover:scale-110 hover:cursor-pointer hover:fill-primary-400"
            />
          </div>
        </React.Fragment>
      );
    }
    // No authenticated
    return (
      <React.Fragment>
        <div className="w-full">
          <div className="hidden flex-col items-center justify-center px-10 xl:flex">
            <Link href="/login" passHref>
              <Button fullWidth>Login</Button>
            </Link>
            <Link href="/register" passHref>
              <p className="cursor-pointer text-sm text-primary-400 hover:underline dark:text-primary-500">
                Signing up?
              </p>
            </Link>
          </div>
          <Tooltip message="To login page" top="-40%" left="50%">
            <Link href="/login" passHref>
              <div className="block rounded-full p-2 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 xl:hidden">
                <Icon name="LockClosedIcon" className="h-8 w-8" />
              </div>
            </Link>
          </Tooltip>
        </div>
      </React.Fragment>
    );
  };

  const renderItem = (item: ISidebarItem, index: number) => {
    const { icon, title, className, active, ...rest } = item;
    return (
      <div
        key={index}
        className={classNames(
          'flex flex-row w-fit xl:px-5 items-center hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full justify-start m-1 text-gray-700 dark:text-gray-200',
          className
        )}
        {...rest}
      >
        <div className="h-12 w-12 rounded-full p-2">{icon(active)}</div>
        <div className="overflow-hidden text-clip">
          <p className="hidden text-lg xl:contents">{title}</p>
        </div>
      </div>
    );
  };

  return (
    <aside className="sticky top-20 flex min-h-[79vh] min-w-min flex-col justify-between border-r pr-3 dark:border-gray-600">
      {/*  Body */}
      <div className="mt-5 flex w-full flex-col items-end xl:items-start">
        {items.map(renderItem)}
      </div>
      {/*  Footer */}
      <div
        className={classNames(
          'mb-5 flex w-fit flex-row items-end justify-between rounded-full p-0.5 xl:w-full xl:items-center',
          { 'hover:bg-gray-300 dark:hover:bg-gray-700': activeUser }
        )}
      >
        {renderAvatar()}
      </div>
    </aside>
  );
};

export default Sidebar;
