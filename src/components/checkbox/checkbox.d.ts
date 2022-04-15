import { BaseHTMLProps } from '@/components/components';

export interface ICheckbox extends BaseHTMLProps<HTMLInputElement> {
  label?: string;
  name?: string;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
  containerProps?: BaseHTMLProps<HTMLLabelElement>;
  labelProps?: BaseHTMLProps<HTMLParagraphElement>;
}
