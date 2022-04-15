import React from 'react';

import { IAvatarGroup } from './avatarGroup';

const AvatarGroup: React.FC<IAvatarGroup> = ({ children }) => {
  return <div className="flex flex-row-reverse justify-center">{children}</div>;
};

export default AvatarGroup;
