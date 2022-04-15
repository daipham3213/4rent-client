import { BaseHTMLProps } from '@/components/components';

export interface ITextArea extends BaseHTMLProps<HTMLTextAreaElement> {
  onTextChanged?: (boolean) => void;
}
