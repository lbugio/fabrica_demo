import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Fabrica</title>
    </Head>
    <Navbar />

    <main className="container grid grid-cols-3 gap-6 mt-10">{children}</main>
  </>
);  