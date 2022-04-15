import React from 'react';

import faker from '@faker-js/faker';

import PostBox from '@/templates/components/post-box';
import { IPost } from '@/templates/components/post/post';
import { Fab } from '@components';
import { Meta } from '@layout';
import { Main, Post } from '@templates';

const post: IPost = {
  contents: faker.lorem.paragraph(8),
  createdBy: {
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fistName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
  },
  currentUser: {
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    fistName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
  },
  createdAt: faker.date.recent(5),
  furnitureStatus: 'full',
  price: 1000000,
  floorArea: 1000,
  location: {
    latitude: 10.12312,
    longitude: 0.123123,
  },
};

const Index = () => {
  const [showPost, setShowPost] = React.useState<boolean>(true);

  return (
    <Main meta={<Meta title="4Rent" description="" />}>
      <div className="flex max-w-2xl flex-col items-center justify-center gap-10">
        <PostBox
          activeUser={post.currentUser}
          isShow={showPost}
          onBackdropClick={() => setShowPost(false)}
        />
        <Post {...post} />
        <Post {...post} />
        <Post {...post} />
      </div>
      <Fab onClick={() => setShowPost(true)} />
    </Main>
  );
};

export default Index;
