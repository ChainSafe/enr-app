import React from "react";

import {Toaster} from "react-hot-toast";
import ENRDecode from "./components/ENRDecode";
import Footer from "./components/Footer";
import ForkMe from "./components/ForkMe";
import Header from "./components/Header";

export default function App(): JSX.Element {
  return (
    <>
      <Toaster />
      <ForkMe />
      <Header />
      <ENRDecode />
      <Footer />
    </>
  );
}
