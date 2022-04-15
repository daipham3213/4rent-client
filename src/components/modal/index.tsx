import React from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { IModal } from './modal';

const Modal: React.FC<IModal> = ({ visible, onClose, children, ...rest }) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <React.Fragment>
      <Transition appear show={visible} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          {...rest}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 -z-10 bg-black opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-10 inline-block w-full max-w-11/12 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all lg:w-fit">
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default Modal;
