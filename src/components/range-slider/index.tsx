import React from 'react';

import classNames from 'classnames';

import { IRangeSlider } from './range-slider';

const RangeSlider: React.FC<IRangeSlider> = ({
  step = 1,
  maximum,
  minimum = 0,
  initialMax = maximum,
  initialMin = minimum,
  onValueChange,
  showMin,
}) => {
  const [minValue, setMinValue] = React.useState(showMin ? initialMin : 0);
  const [maxValue, setMaxValue] = React.useState(initialMax);

  const minValRef = React.useRef<HTMLInputElement>(null);
  const maxValRef = React.useRef<HTMLInputElement>(null);
  const range = React.useRef<HTMLDivElement>(null);

  const getPercent = React.useCallback(
    (value: number) =>
      Math.round(((value - minimum) / (maximum - minimum)) * 100),
    [minimum, maximum]
  );

  React.useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [getPercent, minValue]);

  React.useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [getPercent, maxValue]);

  React.useEffect(() => {
    if (onValueChange) onValueChange(maxValue, minValue);
  }, [maxValue, minValue, onValueChange]);

  return (
    <div className="slider__container">
      <input
        type="range"
        min={minimum}
        step={step}
        max={maximum}
        value={minValue}
        ref={minValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxValue - 1);
          setMinValue(value);
        }}
        className={classNames('thumb z-[3]', {
          'z-[5]': minValue > maximum - 100,
          invisible: !showMin,
        })}
      />
      <input
        type="range"
        min={minimum}
        max={maximum}
        value={maxValue}
        step={step}
        ref={maxValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minValue + 1);
          setMaxValue(value);
        }}
        className={classNames('thumb z-[4]', { '': !showMin })}
      />

      <div className="slider">
        <div className="slider__track" />
        <div
          ref={range}
          className={classNames('slider__range ', {
            hidden: getPercent(Number(maxValRef.current?.value)) < 5,
          })}
        />
        <div
          className="slider__range rounded-l-full"
          style={{
            width:
              range.current && getPercent(Number(maxValRef.current?.value)) < 30
                ? `${getPercent(Number(maxValRef.current?.value)) + 3}%`
                : 0,
          }}
        />
        <div className="slider__left-value">{minValue}</div>
        <div className="slider__right-value">{maxValue}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
