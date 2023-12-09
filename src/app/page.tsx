"use client";
import Image from "next/image";
import Nav from "../app/components/nav/page";
import "../../firebase";

import { getAuth } from "firebase/auth";
import Page from "./components/home/page";
import { FooterLinks } from "./components/footer/footer";
export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <Page />
      <FooterLinks />
    </>
  );
}
