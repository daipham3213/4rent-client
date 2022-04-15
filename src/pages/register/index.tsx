import React from 'react';

import { Transition } from '@headlessui/react';

import { Meta } from '@layout';
import { Unauthorized } from '@templates';

import Request from './Request';
import UpdateInfo from './UpdateInfo';
import Verify from './Verify';

const Container: React.FC<{ show: boolean }> = ({ show, children }) => {
  return (
    <Transition
      as="div"
      show={show}
      enterFrom="-translate-x-full opacity-0"
      leaveTo="-translate-x-full opacity-0"
      enter="transition transform duration-200"
      leave="transition transform duration-200"
      enterTo="translate-x-0 opacity-100"
      leaveFrom="translate-x-0 opacity-100"
      className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-lg bg-white shadow-md dark:bg-gray-700"
    >
      {children}
    </Transition>
  );
};

const Register = () => {
  const [step, setStep] = React.useState<number>();
  const [otp, setOtp] = React.useState<number>(0);
  const show = (index: number) => index === step;

  React.useEffect(() => {
    setTimeout(() => {
      setStep(0);
    }, 100);
    return () => setStep(undefined);
  }, []);

  const handleChangeStep = (index: number) => {
    setStep(index);
  };

  return (
    <Unauthorized meta={<Meta title="Registration" description="" />}>
      <div className="bg-gradiant absolute top-0 left-0 h-screen w-full">
        <div className="absolute top-0 right-0 h-screen w-screen md:mx-10 md:w-96 md:py-5">
          <Container show={show(0)}>
            <Request onNextStep={() => handleChangeStep(1)} />
          </Container>
          <Container show={show(1)}>
            <Verify
              onNextStep={(val) => {
                handleChangeStep(2);
                setOtp(val);
              }}
              onPreviousStep={() => handleChangeStep(0)}
            />
          </Container>
          <Container show={show(2)}>
            <UpdateInfo otp={otp} onPreviousStep={() => handleChangeStep(1)} />
          </Container>
        </div>
      </div>
    </Unauthorized>
  );
};

export default Register;
