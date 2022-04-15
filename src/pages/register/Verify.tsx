import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { InputField } from '@/templates/components/form-fields';
import { Button, Logo } from '@components';
import { useVerifyOTP } from '@services';

interface Props {
  onNextStep: (otp: number) => void;
  onPreviousStep: () => void;
}

const schema = yup.object().shape({
  otp: yup
    .number()
    .required('Please enter OTP Code')
    .test('valid-otp', 'Invalid OTP entered', (value) => {
      return value ? value >= 100000 && value <= 999999 : false;
    }),
});

const Verify = ({ onNextStep, onPreviousStep }: Props) => {
  const { mutateAsync } = useVerifyOTP();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ otp: number }>({
    defaultValues: { otp: 0 },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (value: { otp: number }) => {
    const response = await toast.promise(mutateAsync(value.otp), {
      pending: 'Wait for a bit! ⏳',
    });
    if (response && !response?.error) {
      toast.success(response.data);
      onNextStep(value.otp);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-center justify-center gap-5 px-5 py-2"
    >
      <Logo size="large" />
      <h5 className="text-xl font-bold text-primary-500">Verify OTP</h5>
      <div className="text-center text-sm text-gray-600">
        <p className="">We&apos;ve sent an OPT Code to your email</p>
        <p className="">Please check your inbox or spam! ♥</p>
      </div>
      <InputField
        control={control}
        name="otp"
        label="OPT Code"
        variant="metro"
        type="number"
        isFocus
      />
      <Button size="large" type="submit" disabled={isSubmitting}>
        <p className="px-4 py-2 font-bold">Submit</p>
      </Button>

      <Button variant="ghost" onClick={onPreviousStep}>
        Go Back
      </Button>
    </form>
  );
};

export default Verify;
