export interface IRangeSlider {
  minimum?: number;
  maximum: number;
  step?: number;
  initialMax?: number;
  initialMin?: number;
  showMin?: boolean;
  onValueChange?: (maximum: number, minimum: number) => void;
}
