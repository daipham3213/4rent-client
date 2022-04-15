import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { IRegister } from '@/services/authentication/authentication';
import InputField from '@/templates/components/form-fields/InputField';
import { Button, Checkbox, Logo } from '@components';
import { useRegister } from '@services';
import { EmailRegex, PhoneNumberRegex, UsernameRegex } from '@utils';

interface Props {
  onNextStep: () => void;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username')
    .matches(UsernameRegex, 'Invalid username')
    .typeError('Invalid username!'),
  phoneNumber: yup
    .string()
    .matches(PhoneNumberRegex, 'Invalid phone number')
    .typeError('Invalid phone number'),
  email: yup
    .string()
    .required('Please enter your email')
    .matches(EmailRegex, 'Invalid email')
    .typeError('Invalid Email format'),
});

const Request = ({ onNextStep }: Props) => {
  const [agreed, setAgreed] = React.useState(false);

  const { mutateAsync } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IRegister>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: IRegister) => {
    if (agreed) {
      const response = await toast.promise(mutateAsync(formValues), {
        pending: 'Just a sec! 👀',
      });
      if (!response.error) {
        onNextStep();
        toast.success(response.data);
      }
    } else toast.error('Please agreed to our term and conditions');
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex h-full w-full flex-col items-center justify-evenly"
    >
      <div className="flex w-full flex-col items-center gap-2 py-2 px-5">
        <div className="flex flex-col items-center py-5">
          <Logo size="large" />
          <p className="text-xl text-primary-500">4Rent</p>
        </div>
        <p className="w-full text-sm font-bold text-gray-500">
          Enter your contact info
        </p>
        <InputField
          control={control}
          name="username"
          label="Username"
          variant="metro"
        />
        <InputField
          control={control}
          name="phoneNumber"
          label="Phone"
          variant="metro"
          type="tel"
        />
        <InputField
          control={control}
          name="email"
          label="Email"
          variant="metro"
          type="email"
        />
        <Checkbox
          checked={agreed}
          onChecked={setAgreed}
          label="Accept terms and conditions"
          labelProps={{
            className: 'text-gray-300',
          }}
        />
        <Button
          size="large"
          className="px-2"
          disabled={isSubmitting}
          type="submit"
        >
          <p className="px-3 font-bold">Register</p>
        </Button>
      </div>
      <Link href="/login">
        <p className="cursor-pointer text-right text-sm text-info-600 hover:underline dark:text-gray-300">
          Already has an account? Back to login
        </p>
      </Link>
    </form>
  );
};

export default Request;
