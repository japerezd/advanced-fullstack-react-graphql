import Document, { Html, NextScript, Main, Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es-MX">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
