import React from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

import { AuthContextProvider, useAuth } from "../context/AuthContext";

type PageProps = {};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const { user } = useAuth();

  console.log({ user });

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
