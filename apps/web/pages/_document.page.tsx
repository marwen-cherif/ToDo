import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { $Html } from "./_document.styles";

export default class MyDocument extends Document {
  render() {
    return (
      <$Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </$Html>
    );
  }
}
