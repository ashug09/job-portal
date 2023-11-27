"use client"
import axios from "axios";
import React, { useEffect } from "react";
import ProfileForm from "./employerProfile/profileForm"
import Main from "./main";
export default function CheckProfile({email, name}) {
console.log("this is email: from check profile:  ", email)
  const [status, setStatus] = React.useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/employerCheck", { email: email })
      .then((res) => {
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {status === 200 ? (
        <Main email={email} name={name}/>
      ) : (
        <ProfileForm email={email} />
      )}
    </div>
  );
}
