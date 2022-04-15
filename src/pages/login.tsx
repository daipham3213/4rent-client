import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { tokenKey } from '@/services/ApiProvider';
import { Button, Input, Logo } from '@components';
import { Meta } from '@layout';
import { useLogin } from '@services';
import { Unauthorized } from '@templates';

const Login = () => {
  const { mutateAsync } = useLogin();
  const router = useRouter();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const renderLabel = (label: string) => <p className="w-16">{label}</p>;

  const handleLogin = () => {
    toast.promise(
      mutateAsync(
        { username, password },
        {
          onSuccess: (data) => {
            console.log(data);
            if (data.data) {
              const { token } = data.data;
              if (window) window.localStorage.setItem(tokenKey, token);
            }
            toast.success('Welcome!');
            router.push('/');
          },
        }
      ),
      {
        pending: 'Checking credentials...',
      }
    );
  };

  return (
    <Unauthorized meta={<Meta description="" title="Login" />}>
      <div className="flex h-screen w-full items-center justify-center">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="h-80 w-96 rounded-lg bg-white p-5 shadow-lg dark:bg-gray-600"
        >
          <div className="my-5 flex w-full justify-center">
            <Logo showTitle />
          </div>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            label={renderLabel('Username')}
            name="username"
          />
          <Input
            label={renderLabel('Password')}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <Button className="my-3 w-40" onClick={handleLogin}>
              <p className="font-bold">Login</p>
            </Button>
          </div>
          <Link href="/register">
            <p className="cursor-pointer text-right text-sm text-info-600 dark:text-gray-300">
              Register ?
            </p>
          </Link>
        </motion.div>
      </div>
    </Unauthorized>
  );
};

export default Login;
