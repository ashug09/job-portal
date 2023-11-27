"use client";
import React from "react";
import LogIn from "../authentication/page";
import { useSearchParams } from "next/navigation";
import CheckProfile from "../employer/checkProfile";
import { useRouter } from "next/router";
export default function Page() {
  const router = useRouter();
  const type = useSearchParams().get("type");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user", user);
      const email = user.email;
      const name = user.displayName;
      if (type === "employer") {
        router.push({
          pathname: "/components/employer",

          query: { email: user?.email, name: user?.displayName },
        });
      } else {
        console.log("candidate page in progress !!");
      }
    } else {
      // User is signed out
      // ...
      return <LogIn />;
    }
  });
}
