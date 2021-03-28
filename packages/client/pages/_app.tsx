import 'styles/index.scss';

import React, { useEffect } from 'react';
import { configureEpic, store } from '@cultural-aid/core/redux';

import type { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import { MainLayout } from 'layouts/MainLayout';
import { Provider } from 'react-redux';
import theme from 'utils/theme';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    configureEpic();
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <div id='background' />
        <ChakraProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
