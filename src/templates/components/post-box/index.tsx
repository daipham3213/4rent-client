import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import Geocode from 'react-geocode';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import useOutSideClick from '@/hooks/useOutSideClick';
import { useAddPost } from '@/services/post';
import { IPostCreate } from '@/services/post/post';
import Icon, { FloorPlan } from '@/templates/components/icon';
import Map from '@/templates/components/map';
import { ILocation } from '@/templates/components/types';
import { Avatar, Button, Modal, Select } from '@components';
import { InputField, TextArea } from '@templates';

import { IPostBox } from './post-box';

const apiKey = process.env.NEXT_PUBLIC_API_MAP_KEY ?? '';

Geocode.setRegion('vi');
Geocode.setLanguage('en');
Geocode.setApiKey(apiKey);
Geocode.enableDebug();

const schema = yup.object().shape({
  price: yup.number().required(),
  floorArea: yup.number().required(),
});

const options: string[] = ['Good', 'Fairly', 'Old', 'Empty'];

const PostBox: React.FC<IPostBox> = ({
  activeUser,
  isShow = false,
  onBackdropClick,
  onPosted,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [location, setLocation] = React.useState<ILocation>();
  const [address, setAddress] = React.useState<string>('');
  const [files, setFiles] = React.useState<File[]>([]);

  const [furniture, setFurniture] = React.useState<string>(
    options[0] ?? 'Good'
  );
  const { mutateAsync } = useAddPost();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<IPostCreate>({
    defaultValues: {
      address,
      price: 0,
      furnitureStatus: furniture,
      contents: '',
      floorArea: 10,
      album: {
        name: `album-${location?.latitude}-${location?.longitude}`,
        images: files?.map((value) => ({
          file: value,
          title: value.name,
        })),
      },
      ...location,
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setLocation(position.coords)
    );
  }, []);

  useOutSideClick(
    ref,
    () => {
      if (onBackdropClick) {
        onBackdropClick();
      }
    },
    'mousedown'
  );

  const handleMarkerChange = (pos: ILocation) => {
    setLocation(pos);
    Geocode.fromLatLng(String(pos.latitude), String(pos.longitude)).then(
      (value) => {
        const addr = value.results[0].formatted_address;
        setAddress(addr);
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const arr: File[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files.item(i) != null) {
          // @ts-ignore
          arr.push(event.target.files.item(i));
        }
      }
      setFiles(arr);
    } else setFiles([]);
  };

  const handleFormSubmit = (values: IPostCreate) => {
    toast.promise(
      mutateAsync(
        {
          ...values,
          address,
          furnitureStatus: furniture,
        },
        {
          onSuccess: () => {
            toast.success(
              'Your post has been created. Please wait for administrators resolve them'
            );
            if (onPosted) onPosted();
          },
        }
      ),
      {
        pending: 'Creating new post',
      }
    );
  };

  if (activeUser) {
    const { avatar, lastName, firstName, username } = activeUser;
    return (
      <Modal visible={isShow}>
        <div
          ref={ref}
          className="flex w-[40rem] max-h-[40rem] overflow-y-auto flex-row gap-2 rounded border bg-gray-100 p-3 shadow-lg dark:border-gray-600 dark:bg-gray-700"
        >
          <Avatar
            className="z-10"
            src={avatar}
            alt={`avatar-${firstName}-${lastName}`}
          >
            {username}
          </Avatar>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="z-10 w-full"
          >
            <div className="w-full rounded-xl border bg-white p-1 focus-within:ring-2 dark:border-gray-600 dark:bg-gray-800">
              <TextArea
                {...register('contents')}
                placeholder="Has a place for rent?"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <InputField
                control={control}
                name="price"
                placeholder="Price"
                type="number"
                label={<Icon name="CashIcon" outline className="h-6 w-6" />}
              />
              <InputField
                control={control}
                name="floorArea"
                placeholder="Floor area"
                type="number"
                label={<FloorPlan className="h-6 w-6" />}
              />
              <div onClick={() => fileRef.current?.click()}>
                <Icon
                  className="h-10 w-10 rounded-full p-2 text-primary hover:bg-gray-300"
                  name="CameraIcon"
                />
                <input
                  type="file"
                  id="file"
                  ref={fileRef}
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="overflow-y-hidden">
              {files.map((value) => (
                <img
                  src={URL.createObjectURL(value.slice())}
                  className="mx-1 h-20 w-20 object-cover"
                />
              ))}
            </div>
            <div className="mb-2 flex min-h-fit w-full items-center justify-start rounded-lg bg-gray-200 py-2">
              <Icon
                name="LocationMarkerIcon"
                className="ml-2 h-6 w-6 text-danger-500"
              />
              <p className="ml-2">{address}</p>
            </div>
            <div>
              <Select
                options={options}
                value={furniture}
                onChange={setFurniture}
                mapOptionToLabel={(option) => option}
                mapOptionToValue={(option) => option}
              />
            </div>
            <Map onMarkerChange={handleMarkerChange} />
            <div className="flex w-full justify-end">
              <Button
                disabled={isSubmitting}
                size="large"
                fullWidth
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
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
