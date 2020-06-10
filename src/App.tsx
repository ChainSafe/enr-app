import React from "react";

import ForkMe from "./components/ForkMe";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ENRDecode from "./components/ENRDecode";

export default function App(): JSX.Element {
  return (
    <>
      <ForkMe />
      <Header />
      <ENRDecode />
      <Footer />
    </>
  );
}
