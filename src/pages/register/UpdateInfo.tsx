import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { date, object, string } from 'yup';

import { ICreateAccount } from '@/services/authentication/authentication';
import { Button, Logo, Select } from '@components';
import { useCreateAccount } from '@services';
import { InputField } from '@templates';
import { identityCardRegExp, passwordRegExp } from '@utils';

interface Props {
  onPreviousStep: () => void;
  otp: number;
}

type Gender = { value: string; display: string };

const genders: Gender[] = [
  { value: 'male', display: 'Male' },
  { value: 'female', display: 'Female' },
  { value: 'other', display: 'Other' },
];

const schema = object().shape({
  firstName: string().required('Please enter first name'),
  lastName: string().required('Please enter last name'),
  password: string()
    .required('Please enter password')
    .matches(passwordRegExp, 'Your password is not strong enough!'),
  idCard: string()
    .required('Please enter your ID Card number')
    .matches(identityCardRegExp, 'Invalid ID Card number'),
  dob: date()
    .required('Please enter your date of birth')
    .test('valid-dob', 'Invalid date of birth', (value) => {
      return moment().isAfter(value);
    }),
});

const UpdateInfo = ({ onPreviousStep, otp }: Props) => {
  const [selected, setSelected] = React.useState<Gender>(genders[0] as any);

  const { mutateAsync } = useCreateAccount();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ICreateAccount>({
    defaultValues: { otp, gender: selected.value },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: ICreateAccount) => {
    await toast.promise(
      mutateAsync(values, {
        onSuccess: () => {
          toast.success('Account info updated successfully.');
        },
      }),
      {
        pending: 'Patient is a key to success 📔',
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex h-full flex-col items-center justify-evenly gap-2 px-5 py-2"
    >
      <div className="flex flex-col items-center justify-center">
        <Logo size="large" />
        <h5 className="text-xl font-bold text-primary-500">Final step</h5>
        <div>
          <p className="text-sm text-gray-600">Update your info</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <InputField
            label="First name"
            variant="metro"
            control={control}
            name="firstName"
          />
          <InputField
            label="Last name"
            variant="metro"
            control={control}
            name="lastName"
          />
        </div>
        <InputField
          label="Password"
          variant="metro"
          type="password"
          control={control}
          name="password"
        />
        <InputField
          label="Date of birth"
          variant="metro"
          isFocus={true}
          type="date"
          control={control}
          name="dob"
        />
        <InputField
          control={control}
          name="idCard"
          label="ID Card number"
          variant="metro"
        />
        <Select
          options={genders}
          value={selected}
          label="Gender"
          onChange={setSelected}
          mapOptionToLabel={(option) => option.display}
          mapOptionToValue={(option) => option.value}
        />
      </div>
      <div>
        <Button type="submit" size="large" disabled={isSubmitting}>
          <p className="px-4 py-2 font-bold">Submit</p>
        </Button>

        <Button variant="ghost" onClick={onPreviousStep}>
          Go Back
        </Button>
      </div>
    </form>
  );
};

export default UpdateInfo;
