"use client";
import React, { useEffect, useState } from "react";
import { Card, Text, Group, Badge, Center, Button } from "@mantine/core";
import {
  IconBriefcase2,
  IconCurrencyRupee,
  IconMapPin,
} from "@tabler/icons-react";
import classes from "./job.module.css";
import Link from "next/link";
import axios from "axios";
import LoaderAnimation from "@/app/loader";
export default function FeaturedJobs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    await axios
      .get("/api/featuredJobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="mx-5 mb-2 mt-10 text-xl font-bold">Featured Jobs</h1>
      {loading ? (
        <LoaderAnimation />
      ) : (
        <div className="flex overflow-x-auto hide-scrollbar mx-5">
          {jobs.map((job) => {
            return (
              <Card
                withBorder
                radius="md"
                className={`lg:w-64 min-[120px]:w-8/12 shrink-0 min-[120px]:mx-2 my-2 ${classes.card}`}
                key={job._id}
              >
                <img
                  className="bg-gray-100 h-32 rounded-lg"
                  src={job.companyLogo}
                />
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
                        {job.experience} Experience
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
                  <Link
                    href={{
                      pathname: "/components/job-details",
                      query: { jobId: job._id },
                    }}
                  >
                    <Button radius="xl" style={{ flex: 1, width: "100%" }}>
                      View
                    </Button>
                  </Link>
                </Card.Section>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
