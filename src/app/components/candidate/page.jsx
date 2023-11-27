"use client";
import React from "react";
import { getCookie } from "cookies-next";
import Main from "./main";
import LogIn from "../authentication/page";
import CheckProfile from "./checkProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../../../../firebase";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return user ? (
    <CheckProfile email={user.email} name={user.displayName} />
  ) : (
    <LogIn />
  );
}
