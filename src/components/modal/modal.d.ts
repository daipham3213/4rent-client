import { Dialog } from '@headlessui/react';

export interface IModal extends Omit<Dialog, 'Title'> {
  visible: boolean;
  onClose?: () => void;
}
