import React from 'react';

export interface ISize {
  size?: 'small' | 'large' | 'default';
}

export interface IStatus {
  status?: 'primary' | 'success' | 'info' | 'danger' | 'warning';
}

export interface IVariant {
  variant?: 'filled' | 'outlined' | 'ghost';
}

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type BaseHTMLProps<Element> = React.DetailedHTMLProps<
  React.HTMLAttributes<Element>,
  Element
>;

export type ChildWithProps<T> = (props: T) => React.ReactNode;
