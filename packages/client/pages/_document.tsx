import { ColorModeScript } from '@chakra-ui/react';
import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
  Head,
} from 'next/document';
import React from 'react';
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

class MyDocument extends Document {
  // @ts-ignore
  theme = extendTheme({ config });

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(
      ctx
    );
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <ColorModeScript
            initialColorMode={this.theme.config.initialColorMode}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
