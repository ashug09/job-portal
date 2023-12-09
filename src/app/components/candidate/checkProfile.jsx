"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import ProfileForm from "./candidateProfile/profileForm";
import Main from "./main";
import { notifications } from "@mantine/notifications";
export default function CheckProfile({ email, name }) {
  const [status, setStatus] = React.useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/candidateCheck", { email: email })
      .then((res) => {
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          notifications.show({
            title: "Profile not found",
            message: "Fill your candidate profile form",
            autoClose: 2000,
          });
        }
      });
  }, []);
  return (
    <div>
      {status === 200 ? (
        <Main email={email} name={name} />
      ) : (
        <ProfileForm email={email} />
      )}
    </div>
  );
}
