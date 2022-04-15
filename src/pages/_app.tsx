import { ThemeProvider, useTheme } from 'next-themes';
import { AppProps } from 'next/app';

import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { Hydrate } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { Api } from '@services';

const Application = ({ Component, pageProps }: AppProps) => {
  const { resolvedTheme } = useTheme();
  return (
    <Api.Provider>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Component {...pageProps} />
          <ToastContainer position="top-left" theme={resolvedTheme} />
        </ThemeProvider>
      </Hydrate>
    </Api.Provider>
  );
};

export default Application;
