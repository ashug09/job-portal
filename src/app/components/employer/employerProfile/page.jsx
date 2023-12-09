"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ButtonGroup from "../buttonGroup";
import { getAuth, signOut } from "firebase/auth";
import "../../../../../firebase"
export default function Page() {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const [profile, setProfile] = React.useState([]);
  useEffect(() => {
    fetchEmployerProfile();
  }, []);

  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const fetchEmployerProfile = async () => {
    await axios
      .post("http://localhost:3000/api/employerCheck", { email: email })
      .then((res) => {
        setProfile(res.data.EmployerProfile);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className="mb-8">
        <ButtonGroup />
      </div>
      {profile.map((profile) => {
        return (
          <>
          <div className="lg:flex lg: justify-around">

            <div className="text-center bg-gray-100 rounded-lg w-max p-8 mx-auto">
              <img
                className="bg-gray-100 rounded-full w-44 h-44 mx-auto object-cover"
                src={profile.companyLogo}
              />
              <h1 className="text-2xl font-bold">{profile.companyName}</h1>
              <p className="text-gray-500">{profile.companyDescription}</p>
              <p className="text-gray-500">{profile.companyAddress}</p>
            </div>
            <div className="text-center bg-gray-100 rounded-lg w-max p-8 mx-auto my-8">
              <h1 className="text-2xl font-bold">{profile.recruterName}</h1>
              <p className="text-gray-500">{profile.designation}</p>
              <p className="text-gray-500">{profile.contact}</p>
              <button
                onClick={() => handleSignOut()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 my-4"
              >
                Log Out
              </button>
            </div>
          </div>
          </>
        );
      })}
    </>
  );
}
