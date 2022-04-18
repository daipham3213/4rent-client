import React from 'react';

import faker from '@faker-js/faker';
import {
  DotsHorizontalIcon,
  ShareIcon,
  ChatIcon,
  BookmarkIcon,
  CashIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import moment from 'moment';
import Geocode from 'react-geocode';

import { IMedia } from '@/components/image-grid/image-grid';
import { TextArea } from '@/templates';
import Icon, { FloorPlan } from '@/templates/components/icon';
import Furniture from '@/templates/components/icon/Furniture';
import { Avatar, ImageGrid } from '@components';
import { useKeyPress } from '@hooks';

import { IComment, ICommentBox, IPost } from './post';

const CommentBox: React.FC<ICommentBox> = ({
  message,
  images,
  onSendClick,
  onAddImageClick,
  onMessageChange,
  currentUser,
}) => {
  const [isFocus, setFocus] = React.useState<boolean>(false);
  const [changed, setChanged] = React.useState<boolean>(false);

  const enterPressed = useKeyPress({ targetKey: 'enter' });

  const handleSendClick = React.useCallback(
    () => (onSendClick ? onSendClick() : undefined),
    [onSendClick]
  );
  const handleAddImageClick = React.useCallback(
    () => (onAddImageClick ? onAddImageClick() : undefined),
    [onAddImageClick]
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onMessageChange) {
      onMessageChange(e);
    }
  };

  React.useEffect(() => {
    if (enterPressed && isFocus && (message || images)) {
      handleSendClick();
    }
  }, [enterPressed, handleSendClick, images, isFocus, message]);
  return (
    <div
      className={classNames('flex w-full flex-row gap-2 px-0.5', {
        'hidden': !currentUser,
      })}
    >
      {currentUser ? (
        <Avatar src={currentUser.avatar} alt={currentUser.username}>
          {currentUser.username}
        </Avatar>
      ) : null}
      <div
        className={classNames(
          'flex justify-between items-center px-2 pt-1 w-full rounded-lg bg-white dark:bg-gray-800 cursor-text',
          { 'ring-1 ring-gray-300': !isFocus },
          { 'ring-2': isFocus },
          { 'flex-col pb-2': changed }
        )}
      >
        <TextArea
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onInput={handleOnChange}
          onTextChanged={setChanged}
        />
        <div
          className={classNames(
            'flex h-min flex-row justify-end gap-2 text-gray-500',
            { 'items-end w-full': changed }
          )}
        >
          <Icon
            name="CameraIcon"
            onClick={handleSendClick}
            className="h-4 hover:text-primary-400"
          />
          <Icon
            name="PaperAirplaneIcon"
            onClick={handleAddImageClick}
            className="h-4 rotate-90 hover:text-primary-400"
          />
        </div>
      </div>
    </div>
  );
};

const Comment: React.FC<IComment> = ({
  message,
  createdAt,
  createdBy,
  currentUser,
  replies,
}) => {
  const { avatar, username, firstName, lastName } = createdBy;

  const [showReplies, setShowReplies] = React.useState<boolean>(false);
  const [isReplying, setReplying] = React.useState<boolean>(false);

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden">
        {(replies && replies.length > 0) || isReplying ? (
          <div className="absolute top-14 left-5 h-full w-0.5 rounded-bl-xl border-l-2 border-gray-500" />
        ) : null}
        <div className="flex w-full flex-row gap-3">
          <Avatar
            src={avatar}
            alt={username}
            aria-label={`avatar-${firstName}-${lastName}`}
            className="pt-5"
          >
            {username}
          </Avatar>

          <div className="w-full pb-5">
            <p className="rounded-lg bg-gray-300 py-2 px-5 text-justify text-base dark:bg-gray-800">
              <span className="py-2 font-semibold">
                {firstName} {lastName}
              </span>
              <br />
              {message}
            </p>

            <div className="flex flex-row justify-between text-sm">
              <p
                onClick={() => (currentUser ? setReplying(!isReplying) : {})}
                className="cursor-pointer pt-1 pl-5 font-semibold hover:text-primary-500 hover:underline"
              >
                {currentUser ? 'Reply' : undefined}
              </p>
              <p className="pr-5 pt-1">{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        {!showReplies && !isReplying ? (
          <div className="absolute left-5 h-3 w-10 rounded-bl-lg border-l-2 border-b-2 border-gray-500" />
        ) : null}
        <div className="box-border w-full">
          {!showReplies && replies && replies.length > 0 ? (
            <span
              onClick={() => setShowReplies(true)}
              className="group flex cursor-pointer flex-row pl-16 text-sm hover:text-primary-500"
            >
              <Icon name="ArrowSmRightIcon" outline className="h-6 w-6" />
              <p className="group-hover:underline">{replies.length} replies</p>
            </span>
          ) : (
            <ul>
              {replies &&
                replies.map((value, index) => (
                  <li className="list-item" key={index}>
                    <div className="relative w-full">
                      {index < replies.length - 1 || isReplying ? (
                        <div className="absolute left-5 h-full w-10 border-l-2 border-gray-500" />
                      ) : null}
                      <div className="absolute -top-2 left-5 h-10 w-10 rounded-bl-xl border-l-2 border-b-2 border-gray-500" />
                      <div className="pl-16">
                        <Comment
                          {...value}
                          key={value.id}
                          currentUser={currentUser}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {isReplying ? (
            <div className="relative my-2 h-full min-h-[1.5rem] w-full pl-16">
              <div className="absolute left-5 -top-8 h-8 w-1 border-l-2 border-gray-500" />
              <div className="absolute left-5 top-0 h-5 w-10 rounded-bl-lg border-l-2 border-b-2 border-gray-500" />
              <CommentBox currentUser={currentUser} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Post: React.FC<IPost> = ({
  contents,
  createdAt,
  createdBy,
  floorArea,
  furnitureStatus,
  latitude,
  longitude,
  currentUser,
  price,
}) => {
  const [address, setAddress] = React.useState<string>('');

  const { lastName, firstName, avatar, username } = createdBy;

  const comments: IComment[] = Array.from({ length: 2 }, () => ({
    id: faker.datatype.uuid(),
    message: faker.lorem.paragraph(10),
    createdBy: {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    },
    createdAt: faker.date.recent(8).getTime(),
    replies: Array.from({ length: 2 }, () => ({
      id: faker.datatype.uuid(),
      message: faker.lorem.paragraph(5),
      replies: [],
      createdAt: faker.date.recent(5).getTime(),
      createdBy: {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      },
    })),
  }));

  const media: IMedia[] = Array.from({ length: 10 }, () => ({
    src: faker.image.lorempicsum.imageRandomSeeded(250, 250),
    alt: faker.lorem.text(5),
    isVideo: false,
  }));

  React.useEffect(() => {
    Geocode.fromLatLng(String(latitude), String(longitude)).then((value) => {
      const addr = value.results[0].formatted_address;
      setAddress(addr);
    });
  }, [latitude, longitude]);

  const onMessageChange = (_: React.FormEvent<HTMLSpanElement>) => {};

  return (
    <div className="flex flex-col gap-2 rounded border border-gray-300 bg-gray-100 py-2 dark:border-gray-600 dark:bg-gray-700">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2 px-4">
        <div className="flex flex-row items-center gap-4">
          <Avatar src={avatar} alt={username}>
            {avatar ? null : username}
          </Avatar>
          <div>
            <p className="text-base font-semibold">{`${firstName} ${lastName}`}</p>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
        </div>
        <DotsHorizontalIcon className="h-6 w-6" />
      </div>
      {/*  Images */}
      <ImageGrid.Wrapper media={media}>
        {/*  Functions */}
        {(indicator) => (
          <div className="flex h-10 w-full flex-row items-center justify-between px-5 py-2">
            <div className="flex h-full w-fit gap-5">
              <ShareIcon className="w-6" />
              <ChatIcon className="w-6" />
            </div>
            <ImageGrid.Indicator {...indicator} />
            <BookmarkIcon className="h-6" />
          </div>
        )}
      </ImageGrid.Wrapper>
      {/*  Contents */}
      <div className="px-5 text-justify text-base">
        <p className="pb-3 text-gray-500">{moment(createdAt).fromNow()}</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1">
          <div className="col-span-1 flex h-6 w-full flex-row gap-2">
            <FloorPlan className="h-6 w-6" />
            {floorArea} m2
          </div>
          <div className="col-span-1 flex h-6 w-full flex-row gap-2">
            <Furniture className="h-6 w-6" />
            {furnitureStatus}
          </div>
          <div className="col-span-1 row-start-2 flex h-6 w-full flex-row gap-2 lg:row-start-1">
            <CashIcon className="h-6 w-6" />
            {price}
          </div>
          <div className="col-span-1 row-start-2 flex h-6 w-full flex-row gap-2 lg:row-start-1">
            <LocationMarkerIcon className="h-6 w-6" />
            {address}
          </div>
          <p className="col-span-4 rounded-lg bg-gray-300 p-3 dark:bg-gray-500">
            {contents}
          </p>
        </div>
      </div>
      {/*  Comments */}
      <div className="mt-5 flex flex-col items-center justify-center gap-2 px-2">
        <ul>
          {comments.map((value) => (
            <li className="my-4 list-item" key={value.id}>
              <Comment {...value} key={value.id} currentUser={currentUser} />
            </li>
          ))}
        </ul>
        <CommentBox
          onMessageChange={onMessageChange}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default Post;
