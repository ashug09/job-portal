"use client";
import { useEffect, useState } from "react";
import { Card, Image, Text, Group, Badge, Center, Button } from "@mantine/core";
import {
  IconBriefcase2,
  IconCurrencyRupee,
  IconMapPin,
} from "@tabler/icons-react";
import classes from "./job.module.css";
import Nav from "../nav/page";
import axios from "axios";

export default function JobCard() {
  useEffect(() => {
    axios
      .get("/api/job")
      .then((res) => {
        console.log(res.data.jobs);
        setJobs(res.data.jobs);
      })
      .catch((err) => console.log(err));
  }, []);
  const [jobs, setJobs] = useState([]);

  return (
    <>
      <div className="lg:grid lg:grid-cols-4 lg:gap-4 mx-8 ">
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
                    {job.title}
                  </Text>
                  <Badge size="sm" variant="light">
                    {job.company}
                  </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                  {job.description?.slice(0, 60)}....
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
                      {job.location}
                    </Text>
                  </Center>
                </Group>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Group gap={30}>
                  <Button radius="xl" style={{ flex: 1 }}>
                    View
                  </Button>
                </Group>
              </Card.Section>
            </Card>
          );
        })}
      </div>
    </>
  );
}
