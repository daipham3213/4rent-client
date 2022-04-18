import React from 'react';

import Link from 'next/link';
import Geocode from 'react-geocode';

import useOutSideClick from '@/hooks/useOutSideClick';
import Icon, { FloorPlan } from '@/templates/components/icon';
import Map from '@/templates/components/map';
import { ILocation } from '@/templates/components/types';
import { Avatar, Button, Input, Modal } from '@components';
import { TextArea } from '@templates';

import { IPostBox } from './post-box';

const apiKey = process.env.NEXT_PUBLIC_API_MAP_KEY ?? '';

Geocode.setRegion('vi');
Geocode.setLanguage('en');
Geocode.setApiKey(apiKey);
Geocode.enableDebug();

const PostBox: React.FC<IPostBox> = ({
  activeUser,
  isShow = false,
  onBackdropClick,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [address, setAddress] = React.useState<string>('');
  useOutSideClick(
    ref,
    () => {
      if (onBackdropClick) {
        onBackdropClick();
      }
    },
    'mousedown'
  );

  const handleMarkerChange = (location: ILocation) => {
    Geocode.fromLatLng(
      String(location.latitude),
      String(location.longitude)
    ).then((value) => {
      const addr = value.results[0].formatted_address;
      setAddress(addr);
    });
  };

  if (activeUser) {
    const { avatar, lastName, firstName, username } = activeUser;
    return (
      <Modal visible={isShow}>
        <div
          ref={ref}
          className="flex w-[40rem] flex-row gap-2 rounded border bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-700"
        >
          <Avatar
            className="z-10"
            src={avatar}
            alt={`avatar-${firstName}-${lastName}`}
          >
            {username}
          </Avatar>
          <div className="z-10 w-full">
            <div className="w-full rounded-xl border bg-white p-1 focus-within:ring-2 dark:border-gray-600 dark:bg-gray-800">
              <TextArea placeholder="Has a place for rent?" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <Input
                placeholder="Price"
                type="number"
                label={<Icon name="CashIcon" outline className="h-6 w-6" />}
              />
              <Input
                placeholder="Floor area"
                type="number"
                label={<FloorPlan className="h-6 w-6" />}
              />
            </div>
            <div className="mb-2 flex min-h-fit w-full items-center justify-start rounded-lg bg-gray-200 py-2">
              <Icon
                name="LocationMarkerIcon"
                className="ml-2 h-6 w-6 text-danger-500"
              />
              <p className="ml-2">{address}</p>
            </div>
            <Map onMarkerChange={handleMarkerChange} />
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal visible={isShow}>
      <div ref={ref} className="flex h-80 w-96 flex-row p-5">
        <Icon
          className="w-20 rounded-full text-danger-600"
          name="LockClosedIcon"
          outline
        />
        <div className="flex h-full w-full flex-col items-center justify-evenly">
          <h6 className="text-2xl dark:text-gray-800">Credential required</h6>
          <div className="flex w-full flex-col items-center">
            <Link href="/login" passHref>
              <a>
                <Button size="large" className="w-52">
                  <p className="font-semibold">Login</p>
                </Button>
              </a>
            </Link>
            <Link href="/register" passHref>
              <a className="cursor-pointer text-sm text-primary hover:underline">
                Create a new account?
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostBox;
