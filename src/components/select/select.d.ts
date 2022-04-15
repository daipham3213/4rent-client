import { BaseHTMLProps, IStatus } from '../components';

type Extends = IStatus &
  Omit<BaseHTMLProps<HTMLDivElement>, 'onChange' | 'value'> & {
    isError?: boolean;
    helperText?: string;
    selectorAccessory?: JSX.Element;
    label?: string;
  };

export type ISelect<T> = BaseProps<T> extends Allowed
  ? BaseProps<T> & Extends
  : Required<BaseProps<T>> & Extends;

export type Allowed = string | number;

type BaseProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<T>;
  mapOptionToLabel?: (option: T) => Allowed;
  mapOptionToValue?: (option: T) => Allowed;
};
