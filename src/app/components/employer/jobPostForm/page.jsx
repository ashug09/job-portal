"use client";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobPostForm() {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    fetchLogo()
  }, []);
  const fetchLogo = async () => {
    await axios
      .post("http://localhost:3000/api/employerCheck", { email: email })
      .then((res) => {
        const logo = res.data.EmployerProfile[0];
        setLogo(logo.companyLogo);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  const router = useRouter();
  const email = useSearchParams().get("email");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
      jobLocation: "",
      companyName: "",
      companyAddress: "",
      experience: "",
      salary: "",
      jobType: [],
      skills: [],
      email: email,
    },
    validate(values) {
      const errors = {};
      if (!values.jobTitle) {
        errors.jobTitle = "Job title is required";
      }
      if (!values.jobDescription) {
        errors.jobDescription = "Job description is required";
      }
      if (!values.jobLocation) {
        errors.jobLocation = "Job location is required";
      }
      if (!values.companyName) {
        errors.companyName = "Company name is required";
      }
      if (!values.companyAddress) {
        errors.companyAddress = "Company address is required";
      }
      if (!values.experience) {
        errors.experience = "Experience is required";
      }
      if (!values.salary) {
        errors.salary = "Salary is required";
      }
      if (!values.jobType) {
        errors.jobType = "Job type is required";
      }
      if (!values.skills) {
        errors.skills = "Skills are required";
      }
      return errors;
    },
  });

  const Skills = [
    "Programming languages (e.g., Python, Java, JavaScript, C++, Ruby, etc.)",
    "Data structures and algorithms",
    "Software development methodologies (Agile, Scrum, Waterfall, etc.)",
    "Version control (e.g., Git)",
    "Object-oriented design and programming",
    "Database management and SQL",
    "Web development (HTML, CSS, front-end frameworks like React, Angular, etc.)",
    "Backend development (Node.js, Django, Flask, etc.)",
    "Software testing and debugging",
    "Understanding of cybersecurity principles",
    "Knowledge of cloud computing platforms (e.g., AWS, Azure, Google Cloud)",
    "Understanding of containerization and orchestration (e.g., Docker, Kubernetes)",
    "Understanding of DevOps practices",
    "Knowledge of mobile development (iOS, Android)",
    "Understanding of machine learning and artificial intelligence",
    "Problem-solving and critical thinking",
    "Communication and teamwork skills",
    "Continuous learning and adaptability",
  ];

  const handleFormSubmit = () => {
    setLoading(true);
    form.reset();
    axios
      .post("/api/job", {...form.values, companyLogo: logo})
      .then((res) => {
        console.log(res);
        setLoading(false);
        router.push("/components/employer");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(form.values);
  };
  return (
    <form
      className="mx-5"
      onSubmit={form.onSubmit(() => {
        handleFormSubmit();
      })}
    >
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
      >
        Post New Job
      </Title>

      <TextInput
        label="Job Title"
        placeholder="Your job title"
        name="jobTitle"
        variant="filled"
        {...form.getInputProps("jobTitle")}
      />
      <Textarea
        mt="md"
        label="Job Description"
        placeholder="Your job description"
        maxRows={10}
        minRows={5}
        autosize
        name="jobDescription"
        variant="filled"
        {...form.getInputProps("jobDescription")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Job Location"
          placeholder="Your job location"
          name="jobLocation"
          variant="filled"
          {...form.getInputProps("jobLocation")}
        />
        <TextInput
          label="Company Name"
          placeholder="Your company name"
          name="companyName"
          variant="filled"
          {...form.getInputProps("companyName")}
        />
        <TextInput
          label="Company Address"
          placeholder="Your company address"
          name="companyAddress"
          variant="filled"
          {...form.getInputProps("companyAddress")}
        />
        <TextInput
          label="Experience Required"
          placeholder="Experience"
          name="experience"
          variant="filled"
          {...form.getInputProps("experience")}
        />
        <TextInput
          label="Salary"
          placeholder="Salary"
          name="salary"
          variant="filled"
          {...form.getInputProps("salary")}
        />
        <MultiSelect
          label="Job Type"
          placeholder="Your job type"
          mt="md"
          name="jobType"
          variant="filled"
          data={["on-site", "remote", "full-time", "part-time", "hybrid"]}
          searchable
          nothingFoundMessage="Nothing found..."
          {...form.getInputProps("jobType")}
        />
        <MultiSelect
          label="Skills Required"
          placeholder="Skills"
          mt="md"
          name="skills"
          variant="filled"
          data={Skills}
          searchable
          nothingFoundMessage="Nothing found..."
          {...form.getInputProps("skills")}
        />
      </SimpleGrid>
      <Group className="pb-5" justify="center" mt="xl">
        <Button loading={loading} type="submit" size="md">
          Post
        </Button>
      </Group>
    </form>
  );
}
