import React from 'react';

import Icon from '@/templates/components/icon';

import { IFab } from './fab';

const Fab: React.FC<IFab> = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary-400">
      <div
        className="flex h-full w-full items-center justify-center"
        onClick={onClick}
      >
        <Icon className="h-8 w-8 text-white" name="PencilIcon" outline />
      </div>
    </div>
  );
};

export default Fab;
