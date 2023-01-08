import React from "react";

import "react-toastify/dist/ReactToastify.min.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

import { AuthContextProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

type PageProps = {};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
