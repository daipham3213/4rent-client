import React, { ComponentProps } from 'react';

import * as Outline from '@heroicons/react/outline';
import * as Solid from '@heroicons/react/solid';

interface Props extends ComponentProps<'svg'> {
  name: keyof typeof Solid;
  outline?: boolean;
}

const Icon = ({ name, outline = false, ...rest }: Props) => {
  const HeroIcons = outline ? Outline[name] : Solid[name];
  return <HeroIcons {...rest} />;
};

export default Icon;
export { default as FloorPlan } from './FloorPlan';
export { default as Furniture } from './Furniture';
