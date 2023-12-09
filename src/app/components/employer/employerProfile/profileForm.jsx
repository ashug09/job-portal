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

  const form = useForm({
    initialValues: {
      companyName: "",
      companyDescription: "",
      companyAddress: "",
      recruterName: "",
      designation: "",
      contact: "",
      companyLogo: "",
      email: email,
    },
    validate(values) {
      const errors = {};
      if (!values.companyName) {
        errors.companyName = "Company name is required";
      }
      if (!values.companyDescription) {
        errors.companyDescription = "Company description is required";
      }
      if (!values.companyAddress) {
        errors.companyAddress = "Company address is required";
      }
      if (!values.recruterName) {
        errors.recruterName = "Recruter name is required";
      }
      if (!values.designation) {
        errors.designation = "Designation is required";
      }
      if (!values.contact) {
        errors.contact = "Contact is required";
      }
      if (!values.companyLogo) {
        errors.companyLogo = "Company logo is required";
      }
      return errors;
    },
  });

  const handleFormSubmit = () => {
    setLoading(true);
    form.reset();

    const storage = getStorage();
    const file = form.values.companyLogo;
    const blob = new Blob([file], { type: file?.type });
    const uniqueFileName = file?.name + new Date();
    const storageRef = ref(storage, "images/" + uniqueFileName);

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then(() => {
        getDownloadURL(ref(storage, "images/" + uniqueFileName)).then((url) => {
          axios
            .post("/api/employer", { ...form.values, companyLogo: url })
            .then((res) => {
              setLoading(false);
              notifications.show({
                title: "Profile Created",
                message: "Your profile has been created successfully",
                autoClose: 2000,
                onClose: () => window.location.reload(),
              });
            })
            .catch((err) => {
              alert("something went wrong check console");
              console.log(err);
            });
        });
      })
      .catch((error) => {
        alert("something went wrong check console");
        console.log(error);
      });
  };

  return (
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
        Employer&apos;s Profile Form
      </Title>

      <TextInput
        label="Company Name"
        placeholder="Your company's name"
        name="companyName"
        variant="filled"
        {...form.getInputProps("companyName")}
      />
      <Textarea
        mt="md"
        label="Company Description"
        placeholder="Your company's description"
        maxRows={10}
        minRows={5}
        autosize
        name="companyDescription"
        variant="filled"
        {...form.getInputProps("companyDescription")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Company Address"
          placeholder="Your company's address"
          name="companyAddress"
          variant="filled"
          {...form.getInputProps("companyAddress")}
        />
        <TextInput
          label="Recruter Name"
          placeholder="recuter's name"
          name="recruterName"
          variant="filled"
          {...form.getInputProps("recruterName")}
        />
        <TextInput
          label="Designation"
          placeholder="Your designation"
          name="designation"
          variant="filled"
          {...form.getInputProps("designation")}
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
      </SimpleGrid>

      <FileInput
        className="my-5 w-max p-2 mx-auto hidden"
        label="Upload your company's logo"
        placeholder="Your company's logo"
        name="companyLogo"
        variant="filled"
        ref={fileRef}
        {...form.getInputProps("companyLogo")}
      />
      <Button
        onClick={() => fileRef.current.click()}
        className="mt-5 mx-5"
        size="md"
      >
        <span className="mr-2">
          <IconCloudUpload />
        </span>{" "}
        Upload Company&apos;s Logo
      </Button>
      <h4>{form.values.companyLogo?.name}</h4>
      <h6 className="text-red-500 text-sm">{form.errors.companyLogo}</h6>
      <Group className="pb-5" justify="center" mt="xl">
        <Button loading={loading} type="submit" size="md">
          Create Profile
        </Button>
      </Group>
    </form>
  );
}
