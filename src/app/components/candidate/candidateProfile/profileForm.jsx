"use client";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  MultiSelect,
  FileInput,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCloudUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "../../../../../firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
export default function ProfileForm({ email }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const cvRef = useRef(null);
  const educationalQualifications = [
    "High School Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Ph.D.",
    "Associate Degree",
    "Vocational Training Certificate",
    // Add more qualifications as needed
  ];

  const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "SQL",
    "React",
    "Node.js",
    "Angular",
    "Vue.js",
    "Ruby",
    "PHP",
    "Swift",
    "TypeScript",
    "Django",
    "Express.js",
    "Spring",
    "TensorFlow",
    "Kotlin",
    "Flutter",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "HTML5",
    "CSS3",
    "Sass",
    "LESS",
    "Bootstrap",
    "jQuery",
    "Laravel",
    "ASP.NET",
    "RESTful API",
    "GraphQL",
    "Redux",
    "Webpack",
    "Gulp",
    "Bash",
    "Jira",
    "Confluence",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Figma",
    "Sketch",
    "Adobe XD",
    "UI/UX Design",
    "Responsive Web Design",
    "Agile Methodologies",
    "Scrum",
    "Kanban",
    "Continuous Integration (CI)",
    "Test-Driven Development (TDD)",
    "Machine Learning",
    "Artificial Intelligence",
    "Big Data",
    "Cybersecurity",
    "Ethical Hacking",
    "Blockchain",
    "Quantum Computing",
    "AR/VR Development",
    // Add more skills as needed
  ];

  const form = useForm({
    initialValues: {
      name: "",
      aboutYou: "",
      address: "",
      contact: "",
      qualification: [],
      skills: [],
      jobType: [],
      profilePicture: "",
      resume: "",
      email: email,
    },
    validate(values) {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.aboutYou) {
        errors.aboutYou = "About you is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      if (!values.contact) {
        errors.contact = "Contact is required";
      }
      if (!values.qualification) {
        errors.qualification = "Qualification is required";
      }
      if (!values.skills) {
        errors.skills = "Skills is required";
      }
      if (!values.jobType) {
        errors.jobType = "Job type is required";
      }
      if (!values.profilePicture) {
        errors.profilePicture = "Profile picture is required";
      }
      if (!values.resume) {
        errors.resume = "Resume is required";
      }
      return errors;
    },
  });

  const handleFormSubmit = () => {
    setLoading(true);
    form.reset();
    console.log(form.values);
    const storage = getStorage();
    const file = form.values.resume;
    const profilePicture = form.values.profilePicture;
    const cvBlob = new Blob([file], { type: file?.type });
    const profilePictureBlob = new Blob([profilePicture], {
      type: profilePicture?.type,
    });
    const uniqueFileName = file?.name + new Date();
    const uniqueProfilePictureName = profilePicture?.name + new Date();
    const storageRef = ref(storage, "resume/" + uniqueFileName);
    const storageRef2 = ref(
      storage,
      "profilePictures/" + uniqueProfilePictureName
    );
    uploadBytes(storageRef, cvBlob)
      .then((snapshot) => {
        console.log("Uploaded resume blob or file!");
        uploadBytes(storageRef2, profilePictureBlob).then((snapshot) => {
          console.log("Uploaded profile picture blob or file!");
          getDownloadURL(ref(storage, "resume/" + uniqueFileName)).then(
            (cvUrl) => {
              getDownloadURL(
                ref(storage, "profilePictures/" + uniqueProfilePictureName)
              ).then((profilePictureUrl) => {
                axios
                  .post("/api/candidate", {
                    ...form.values,
                    profilePicture: profilePictureUrl,
                    resume: cvUrl,
                  })
                  .then((res) => {
                    setLoading(false);
                    notifications.show({
                      title: "Profile Created",
                      message: "Your profile has been created successfully",
                      autoClose: 2000,
                    });
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert("something went wrong check console");
                    console.log(err);
                  });
              });
            }
          );
        });
      })
      .catch((error) => {
        alert("something went wrong check console");
        console.log(error);
      });
  };
  return (
    <>
      <form
        className="lg:mx-80 mx-5"
        onSubmit={form.onSubmit(() => {
          handleFormSubmit();
        })}
      >
        <Title
          className="pt-2 pb-8"
          order={2}
          size="h1"
          style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
          fw={900}
          ta="center"
        >
          Candidate&apos;s Profile cum Application Form
        </Title>

        <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          variant="filled"
          {...form.getInputProps("name")}
        />
        <Textarea
          mt="md"
          label="About You"
          placeholder="Your little introduction"
          maxRows={10}
          minRows={5}
          autosize
          name="aboutYou"
          variant="filled"
          {...form.getInputProps("aboutYou")}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Address"
            placeholder="Your residential address"
            name="address"
            variant="filled"
            {...form.getInputProps("address")}
          />
          <NumberInput
            label="Contact"
            placeholder="Your contact"
            name="contact"
            leftSection="+91 "
            rightSection=" "
            minLength={10}
            maxLength={10}
            variant="filled"
            {...form.getInputProps("contact")}
          />
          <MultiSelect
            label="Educational Qualifications"
            placeholder="Your educational qualifications"
            mt="md"
            name="qualification"
            variant="filled"
            data={educationalQualifications}
            searchable
            nothingFoundMessage="Nothing found..."
            {...form.getInputProps("qualification")}
          />

          <MultiSelect
            label="Skills"
            placeholder="Your skills"
            mt="md"
            name="skills"
            variant="filled"
            data={skills}
            searchable
            nothingFoundMessage="Nothing found..."
            {...form.getInputProps("skills")}
          />

          <MultiSelect
            label="Preffered Job Type"
            placeholder="Your preffered job type"
            mt="md"
            name="jobType"
            variant="filled"
            data={[
              "Full-time",
              "Part-time",
              "Contract",
              "Freelance",
              "Internship",
              "Temporary",
              "Remote",
              // Add more job types as needed
            ]}
            {...form.getInputProps("jobType")}
          />
        </SimpleGrid>

        <FileInput
          className="my-5 w-max p-2 mx-auto hidden"
          label="Upload your profile picture"
          placeholder="Your profile picture"
          name="profilePicture"
          variant="filled"
          ref={fileRef}
          {...form.getInputProps("profilePicture")}
        />

        <FileInput
          className="my-5 w-max p-2 mx-auto hidden"
          label="Upload your resume/cv"
          placeholder="Your resume"
          name="resume"
          variant="filled"
          ref={cvRef}
          {...form.getInputProps("resume")}
        />

        <Group className="pb-5" justify="center" mt="xl">
          <Button
            onClick={() => fileRef.current.click()}
            className="mt-5 mx-5"
            size="md"
          >
            <span className="mr-2">
              <IconCloudUpload />
            </span>{" "}
            Upload profile picture
          </Button>
          <h4>{form.values.profilePicture?.name}</h4>
          <h6 className="text-red-500 text-sm">{form.errors.profilePicture}</h6>

          <Button
            onClick={() => cvRef.current.click()}
            className="mt-5 mx-5"
            size="md"
          >
            <span className="mr-2">
              <IconCloudUpload />
            </span>{" "}
            Upload Resume/CV
          </Button>
          <h4>{form.values.resume?.name}</h4>
          <h6 className="text-red-500 text-sm">{form.errors.resume}</h6>
        </Group>

        <Group className="pb-5" justify="center" mt="xl">
          <Button loading={loading} type="submit" size="md">
            Create Profile
          </Button>
        </Group>
      </form>
    </>
  );
}
