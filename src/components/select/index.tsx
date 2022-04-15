import React from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import { ISelect, Allowed } from './select';

const isAllowed = (v: any): v is Allowed =>
  typeof v === 'string' || typeof v === 'number';

function Select<T>({
  mapOptionToLabel,
  mapOptionToValue,
  options,
  value,
  onChange,
  status,
  label,
  isError,
  helperText,
  className,
  ...rest
}: ISelect<T>) {
  const toLabel = (option: T): Allowed => {
    if (mapOptionToLabel) {
      return mapOptionToLabel(option);
    }
    // if our props are provided correctly, this should never be false
    return isAllowed(option) ? option : String(option);
  };

  const toValue = (option: T): Allowed => {
    if (mapOptionToValue) {
      return mapOptionToValue(option);
    }
    return isAllowed(option) ? option : String(option);
  };

  const handleChange = (e: T) => onChange(e);

  const box = classNames(
    'relative py-2 pl-3 pr-10 w-full text-sm text-left text-left shadow-md cursor-default rounded dark:bg-gray-700',
    'cursor-default ring-2 ring-gray-400 dark:ring-gray-600 focus:outline-none focus:ring-2 sm:text-sm',
    {
      'ring-primary-400 focus:ring-primary-500 border-0 focus:border-primary-500':
        (status === 'primary' || !status) && !isError,
    },
    {
      'ring-info-400 focus:ring-info-500 focus:border-info-500':
        status === 'info',
    },
    {
      'ring-success-400 focus:ring-success-500 focus:border-success-500':
        status === 'success',
    },
    {
      'ring-waring-400 focus:ring-warning-500 focus:border-warning-500':
        status === 'warning',
    },
    {
      'ring-danger-400 focus:ring-danger-500 focus:border-danger-500':
        status === 'danger' || isError,
    }
  );

  const activeItem = classNames(
    {
      'text-primary-900 bg-primary-100 dark:bg-primary-400':
        (status === 'primary' || !status) && !isError,
    },
    { 'text-info-900 bg-info-100 dark:bg-info-400': status === 'info' },
    {
      'text-success-900 bg-success-100 dark:bg-success-400':
        status === 'success',
    },
    {
      'text-warning-900 bg-warning-100 dark:bg-warning-400':
        status === 'warning',
    },
    {
      'text-danger-900 bg-danger-100 dark:bg-danger-400':
        status === 'danger' || isError,
    },
    'rounded shadow'
  );

  return (
    <div className={classNames('relative my-2 w-full', className)} {...rest}>
      <Listbox value={value} onChange={handleChange}>
        <Listbox.Label>
          <p className="absolute -top-3 left-3 z-10 bg-white px-1 text-sm text-primary-500 dark:bg-gray-700">
            {label}
          </p>
        </Listbox.Label>
        <div className="relative">
          <Listbox.Button className={box}>
            <span className="block truncate font-semibold">
              {toLabel(value)}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {isError && helperText ? (
            <Listbox.Label className="text-sm text-danger-500">
              <p className="ml-2 mt-2">{helperText}</p>
            </Listbox.Label>
          ) : null}
        </div>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={classNames(
              'absolute z-10 w-full mt-1 py-1 overflow-auto text-base rounded-md shadow-lg max-h-60',
              'focus:outline-none sm:text-sm bg-white dark:bg-gray-700 shadow shadow-white'
            )}
          >
            {options.map((item, _) => (
              <Listbox.Option
                className={({ active }) =>
                  `${
                    active ? activeItem : 'text-gray-900'
                  } cursor-default select-none relative py-2 pl-10 pr-4`
                }
                key={toValue(item)}
                value={item}
              >
                {({ selected, active }) => (
                  <React.Fragment>
                    <span
                      className={`${
                        selected ? 'font-semibold' : 'font-normal'
                      } block truncate dark:text-gray-300`}
                    >
                      {toLabel(item)}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-amber-600' : 'text-amber-600'
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3 ignore`}
                      >
                        <CheckIcon
                          className={classNames('w-5 h-5', activeItem)}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </React.Fragment>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export default Select;
