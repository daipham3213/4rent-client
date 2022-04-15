import React from 'react';

import faker from '@faker-js/faker';
import { useRouter } from 'next/router';

import { Avatar } from '@components';
import { Meta } from '@layout';
import { NonSidebar } from '@templates';

const Profile = () => {
  const { query } = useRouter();
  const user = {
    id: query.id,
    avatar: faker.internet.avatar(),
    fistName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    dob: faker.date.past(19),
    email: faker.internet.email(),
    idCard: faker.helpers.createCard().phone,
    isAdmin: false,
    isVerify: false,
  };

  const meta = () => (
    <Meta
      title={`${user.fistName} ${user.lastName} - Profile`}
      description=""
    />
  );

  return (
    <NonSidebar meta={meta}>
      <div>
        {/*  Cover */}
        <div>
          <img src={faker.image.city()} alt="cover" />
        </div>
        {/*  Info */}
        <div>
          <Avatar src={user.avatar} alt="avatar" />
          <div>
            <p>
              {user.fistName} {user.lastName}
            </p>
            <p>@{user.username}</p>
          </div>
        </div>
        {/*  Posts */}
      </div>
    </NonSidebar>
  );
};

export default Profile;
