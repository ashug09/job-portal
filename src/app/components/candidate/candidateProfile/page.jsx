"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ButtonGroup from "../buttonGroup";
import { getAuth, signOut } from "firebase/auth";
import LoaderAnimation from "../../../loader";
import "../../../../../firebase";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import classes from "./userCard.module.css";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const buttonGroupStatus = useSearchParams().get("buttonGroup");
  const [loading, setLoading] = React.useState(true);
  const [candidate, setCandidate] = React.useState([]);

  useEffect(() => {
    fetchCandidateProfile();
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

  const fetchCandidateProfile = () => {
    axios
      .post("http://localhost:3000/api/candidateCheck", { email: email })
      .then((res) => {
        setCandidate(res.data.candidate[0]);
        setLoading(false);
      })
      .catch((err) => {
        alert("something went wrong check console");
        console.log("err", err);
      });
  };
  return (
    <>
      <div className={`${buttonGroupStatus || null} mb-8`}>
        <ButtonGroup />
      </div>

      {loading ? (
        <LoaderAnimation />
      ) : (
        <Card
          withBorder
          padding="xl"
          radius="md"
          className={`w-80 mx-auto my-5 ${classes.card}`}
        >
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
            }}
          />
          <Avatar
            src={candidate.profilePicture}
            size={150}
            radius={80}
            mx="auto"
            mt={-110}
            className={classes.avatar}
          />
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {candidate.name}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {candidate.email}
          </Text>

          <Group mt="md" justify="center" gap={30}>
            <div key={34}>
              <Text ta="center" fz="lg" fw={500}>
                {candidate.appliedJobs.length}
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                Jobs Applied
              </Text>
            </div>
            <div key={34}>
              <Text ta="center" fz="lg" fw={500}>
                {candidate.skills.length}
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                Skills
              </Text>
            </div>

            <div key={34}>
              <Text ta="center" fz="lg" fw={500}>
                {candidate.qualification.length}
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                Qualifications
              </Text>
            </div>
          </Group>

          <div className=" border-t-2 border-gray-200 mt-4">
            <h1 className="text-left text-lg my-1">Skills</h1>
            <div className="flex overflow-x-auto hide-scrollbar">
              {candidate.skills.map((skill, index) => {
                return (
                  <div
                    className="bg-blue-500 border-2 rounded-2xl text-white text-sm px-2 py-1 mx-1 w-max"
                    key={index}
                  >
                    <p className="text-center capitalize w-max">{skill}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" border-t-2 border-gray-200 mt-4">
            <h1 className="text-left text-lg my-1">Preferred Job Type</h1>
            <div className="flex overflow-x-auto hide-scrollbar">
              {candidate.jobType.map((type, index) => {
                return (
                  <div
                    className="bg-blue-500 border-2 rounded-2xl text-white text-sm px-2 py-1 mx-1 w-max"
                    key={index}
                  >
                    <p className="text-center capitalize w-max">{type}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" border-t-2 border-gray-200 mt-4">
            <div className="mt-2">
              <h1 className="text-left text-lg my-1">Qualifications</h1>
              <div className="flex overflow-x-auto hide-scrollbar">
                {candidate.qualification.map((qualification, index) => {
                  return (
                    <div
                      className="bg-blue-500 border-2 rounded-2xl text-white text-sm px-2 py-1 mx-1 w-max"
                      key={index}
                    >
                      <p className="text-center capitalize w-max">
                        {qualification}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className=" border-t-2 border-gray-200 mt-4">
            <div className="mt-2">
              <h1 className="text-left text-lg my-1">About {candidate.name}</h1>
              <div className="flex overflow-x-auto hide-scrollbar">
                {candidate.aboutYou}
              </div>
            </div>
          </div>

          <div className="flex justify-around">
            <Link href={candidate.resume} target="_blank">
              <Button radius="md" mt="xl" mx={5} size="sm" variant="default">
                Download Resume/CV
              </Button>
            </Link>
            {/* buttonGroupStatus is used here so as to hide the candidate profile's log out button when employer visits the candidate's profile */}
            <div className={`${buttonGroupStatus || null}`}>
              <Button
                onClick={() => handleSignOut()}
                radius="md"
                mt="xl"
                mx={5}
                size="sm"
                variant="default"
              >
                Log Out
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
