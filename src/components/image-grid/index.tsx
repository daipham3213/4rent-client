import React, { useContext } from 'react';

import { Transition } from '@headlessui/react';
import classNames from 'classnames';

import { BaseHTMLProps } from '@/components/components';
import Icon from '@/templates/components/icon';

import { IGridContext, IImageGrid, IIndicator, IMedia } from './image-grid';

const GridContext = React.createContext<IGridContext>({
  activeIndex: 0,
  activeItem: { src: '' },
  media: [],
  onActiveChange: () => {},
});

const useGridContext = (media: IMedia[]): Omit<IGridContext, 'renderItem'> => {
  const [activeIndex, setActive] = React.useState(0);

  const onActiveChange = (index: number) => {
    setActive(index);
  };

  return {
    activeItem: media[activeIndex] as any,
    onActiveChange,
    media,
    activeIndex,
  };
};

const Wrapper: React.FC<IImageGrid> = ({
  media,
  children,
  className,
  ...rest
}) => {
  const {
    activeItem,
    activeIndex = 0,
    onActiveChange,
    ...props
  } = useGridContext(media);
  const [previous, setPrevious] = React.useState(0);

  const renderItem = (item: IMedia, i: number) => {
    const isRight = previous > activeIndex;
    return (
      <Transition
        key={i}
        as={React.Fragment}
        show={activeIndex === i}
        enter="transform transition ease-in-out duration-500"
        enterFrom={
          isRight ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`
        }
        enterTo={`translate-x-0 opacity-100`}
        leave="transform transition ease-in-out duration-500 "
        leaveFrom={`translate-x-0 opacity-100`}
        leaveTo={
          isRight ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`
        }
      >
        {item.isVideo ? (
          <video
            className="w-full object-center"
            src={item.src}
            title={item.alt}
          />
        ) : (
          <img className="w-full object-cover" src={item.src} alt={item.alt} />
        )}
      </Transition>
    );
  };

  const handleChangeIndex = (i: number) => {
    let nextIndex = 0;
    if (i !== media.length) {
      if (i < 0) nextIndex = media.length - 1;
      else nextIndex = i;
    }
    setPrevious(activeIndex);
    if (onActiveChange) {
      onActiveChange(nextIndex);
    }
  };

  return (
    <GridContext.Provider
      value={{ onActiveChange, activeIndex, activeItem, ...props }}
    >
      <div className={classNames('relative w-full', className)} {...rest}>
        <div className="equal flex flex-row">{media.map(renderItem)}</div>
        <p className="absolute bottom-2 left-1/2 text-sm text-gray-300">
          {`${activeIndex + 1}/${media.length}`}
        </p>
        <Icon
          name="ChevronLeftIcon"
          onClick={() => handleChangeIndex(activeIndex - 1)}
          className="absolute left-0 top-1/2 h-8 w-8 cursor-pointer rounded-full hover:bg-gray-400/70"
        />
        <Icon
          name="ChevronRightIcon"
          onClick={() => handleChangeIndex(activeIndex + 1)}
          className="absolute right-0 top-1/2 h-8 w-8 cursor-pointer rounded-full hover:bg-gray-400/70"
        />
      </div>
      <React.Fragment>
        {typeof children === 'function' ? children({ ...props }) : children}
      </React.Fragment>
    </GridContext.Provider>
  );
};

const Indicator: React.FC<IIndicator & BaseHTMLProps<HTMLDivElement>> = ({
  renderItem,
  media,
  maxDots = 5,
  className,
  ...rest
}) => {
  const { activeIndex, activeItem } = useContext(GridContext);

  const { length } = media;
  const middle = Number((maxDots / 2).toFixed());

  const getActiveDotPosition = React.useCallback(() => {
    if (activeIndex <= middle - 1) return activeIndex;
    if (activeIndex > middle - 1 && length - activeIndex >= middle) {
      return middle - 1;
    }
    return maxDots - (length - activeIndex);
  }, [activeIndex, length, maxDots, middle]);

  const renderDot = React.useCallback(
    (item: IMedia, i) => {
      const active = i === getActiveDotPosition();
      if (renderItem) {
        return renderItem(item, active);
      }
      return (
        <p
          key={i}
          className={classNames(
            { 'transition-all': active },
            { 'scale-100': !active },
            { 'font-bold text-primary-400 mx-0.5': active },
            'text-2xl duration-100'
          )}
        >
          .
        </p>
      );
    },
    [getActiveDotPosition, renderItem]
  );

  return (
    <div className={classNames('flex flex-row', className)} {...rest}>
      {Array.from(
        { length: maxDots },
        (_, i) => activeItem && renderDot(activeItem, i)
      )}
    </div>
  );
};

const ImageGrid = { Wrapper, Indicator };
export default ImageGrid;
