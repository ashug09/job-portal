"use client";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import classes from "./userCard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoaderAnimation from "@/app/loader";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import "../../../../../firebase"
export default function UserCardImage() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const jobId = useSearchParams().get("jobId");
  const companyName = useSearchParams().get("companyName");
  useEffect(() => {
    axios
      .post("/api/job/getUsers", {
        jobId: jobId,
      })
      .then((res) => {
        console.log("res", res.data.users[0]?.userApplied);
        axios
          .post("/api/candidatesApplied", {
            email: res.data.users[0]?.userApplied,
          })
          .then((res) => {
            console.log("res from candidates applied", res.data.candidates);
            setCandidates(res.data.candidates);
          })
          .catch((err) => {
            alert("no candidates applied");
            console.log("err from candidate applied", err);
          });
        setLoading(false);
      })
      .catch((err) => {
        alert("something went wrong check console");
        console.log("err", err);
      });
  }, []);

  const handleShortlist = () => {
    axios
      .post("/api/send/interview", {
        companyName: companyName,
        name: candidates[0]?.name,
        email: candidates[0]?.email,
      })
      .then((res) => {
        console.log("res", res);
        notifications.show({
          title: "Candidate Shortlisted",
          message: "notification posted successfully to the candidate",
          color: "teal",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      {loading ? (
        <LoaderAnimation />
      ) : (
        <div className="lg:grid lg:grid-cols-4 lg:gap-1">
          {candidates.map((candidate) => {
            return (
              <Card
                withBorder
                padding="xl"
                radius="md"
                className={`w-80 mx-auto my-5 ${classes.card}`}
                key={candidate._id}
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
                <div className=" border-t-2 border-gray-200 mt-8"></div>
                <div className="flex justify-around">
                  <Link href={candidate?.resume} target="_blank">
                    <Button
                      radius="md"
                      mt="xl"
                      mx={5}
                      size="sm"
                      variant="default"
                    >
                      Download Resume/CV
                    </Button>
                  </Link>
                  <Link
                    href={{
                      pathname: "/components/candidate/candidateProfile",
                      query: { email: candidate?.email, buttonGroup: "hidden" },
                    }}
                  >
                    <Button
                      radius="md"
                      mt="xl"
                      mx={5}
                      size="sm"
                      variant="default"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
                <Button
                  onClick={() => handleShortlist()}
                  radius="md"
                  mt="sm"
                  mx={5}
                  size="sm"
                  variant="default"
                >
                  Shortlist For Interview
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
