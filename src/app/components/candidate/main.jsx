"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { Card, Image, Text, Group, Badge, Center, Button } from "@mantine/core";
import {
  IconBriefcase2,
  IconCurrencyRupee,
  IconMapPin,
} from "@tabler/icons-react";
import LoaderAnimation from "../../loader";
import ButtonGroup from "./buttonGroup";
import classes from "./job.module.css";
export default function Main({ email, name }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchEmployerPosts();
  }, []);
  const [jobs, setJobs] = React.useState([]);
  const fetchEmployerPosts = () => {
    axios
      .post("http://localhost:3000/api/candidate", { email: email })
      .then((res) => {
        axios
          .post("http://localhost:3000/api/appliedJobs", {
            appliedJobs: res.data.candidate[0]?.appliedJobs,
          })
          .then((res) => {
            setJobs(res.data.message);
            setLoading(false);
          })
          .catch((err) => console.log(err));
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
        <div className="mx-8">
          <h1 className=" text-2xl border-b-2 pb-2 relative">Hello! {name}</h1>
          <h5>Candidate&apos;s Dashboard</h5>
          <ButtonGroup email={email} name={name} />
          <div>
            <div className="flex justify-between">
              <h1 className="capitalize my-5 text-lg">
                recently applied jobs by you
              </h1>
              {jobs?.length >= 0 ? (
                <Link
                  href={{
                    pathname: "/components/job",
                    query: { email: email },
                  }}
                >
                  <Button variant="filled" className="mt-5 ">
                    Apply
                  </Button>
                </Link>
              ) : null}
            </div>

            {jobs?.length > 0 ? (
              <div className="lg:grid lg:grid-cols-4 lg:gap-4 ">
                {jobs.map((job) => {
                  return (
                    <Card
                      withBorder
                      radius="md"
                      className={`lg:w-64 min-[120px]:w-full min-[120px]:mx-2 my-2 ${classes.card}`}
                      key={job._id}
                    >
                      <Card.Section className={classes.section} mt="md">
                        <Group justify="apart">
                          <Text fz="lg" fw={500}>
                            {job.jobTitle}
                          </Text>
                          <Badge size="sm" variant="light">
                            {job.companyName}
                          </Badge>
                        </Group>
                        <Text fz="sm" mt="xs">
                          {job.jobDescription?.slice(0, 60)}....
                        </Text>
                      </Card.Section>

                      <Card.Section className={classes.section} mt="md">
                        <Group gap={8} mb={-8}>
                          <Center>
                            <IconBriefcase2
                              size="1.05rem"
                              className={classes.icon}
                              stroke={1.5}
                            />
                            <Text size="xs" className="capitalize">
                              {job.experience} Year Experience
                            </Text>
                          </Center>

                          <Center>
                            <IconCurrencyRupee
                              size="1.05rem"
                              className={classes.icon}
                              stroke={1.5}
                            />
                            <Text size="xs" className="capitalize">
                              {job.salary} Salary
                            </Text>
                          </Center>

                          <Center>
                            <IconMapPin
                              size="1.05rem"
                              className={classes.icon}
                              stroke={1.5}
                            />
                            <Text size="xs" className="capitalize">
                              {job.jobLocation}
                            </Text>
                          </Center>
                        </Group>
                      </Card.Section>

                      <Card.Section className={classes.section}>
                        <Group gap={30}>
                          <Link
                            href={{
                              pathname: "/components/job-details",
                              query: { jobId: job._id },
                            }}
                          >
                            <Button radius="xl" style={{ flex: 1 }}>
                              View
                            </Button>
                          </Link>
                        </Group>
                      </Card.Section>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg h-48">
                <h1 className="flex flex-col capitalize text-center pt-10 w-max mx-auto">
                  no jobs applied by you{" "}
                  <Link
                    href={{
                      pathname: "/components/job",
                      query: { email: email },
                    }}
                  >
                    <Button variant="filled" className="mt-5 ">
                      Apply Now
                    </Button>
                  </Link>
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
