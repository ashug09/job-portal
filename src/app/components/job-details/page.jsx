"use client";
import React, { useEffect } from "react";
import {
  IconMapPin,
  IconMailFilled,
  IconCoinRupee,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import LoaderAnimation from "../../loader";
import dateFormat, { masks } from "dateformat";
import "../../../../firebase";
import { notifications } from "@mantine/notifications";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Page() {
  const jobId = useSearchParams().get("jobId");
  const [job, setJob] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [candidate, setCandidate] = React.useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  useEffect(() => {
    //this api endpoint will return the job details with associated jobId
    axios
      .post("/api/job/getJob", { jobId: jobId })
      .then((res) => {
        setJob(res.data.job[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleApplyNow = (id, candidateEmail) => {
    if (!user) {
      notifications.show({
        title: "Please Login",
        message: "You need to login to apply for this job",
        color: "red",
        autoClose: 2000,
      });
    } else {
      axios
        .post("/api/candidateCheck", {
          email: user?.email,
        })
        .then((res) => {
          //checking if candidate has completed his profile
          if (res.status === 200) {
            axios
              .put("/api/candidate", {
                email: user.email,
                jobId: id,
              })
              .then((res) => {
                //checking if candidate has already applied for this job
                // if status = 201 then not applied for this job yet
                if (res.data.status === 201) {
                  axios
                    .put("/api/job", {
                      jobId: id,
                      candidateEmail: candidateEmail,
                    })
                    .then(() => {
                      notifications.show({
                        title: "Applied Successfully",
                        message: "You have successfully applied for this job",
                        color: "green",
                        autoClose: 2000,
                      });
                    });
                }
                if (res.data.status === 500) {
                  notifications.show({
                    title: "Already Applied",
                    message: "You have already applied for this job",
                    color: "red",
                    autoClose: 2000,
                  });
                }
              })
              .catch((err) => {
                alert("Something went wrong check console");
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log("error: " + err);
          notifications.show({
            title: "Please Complete Your Candidate Profile",
            message: "You need to complete your profile to apply for this job",
            color: "red",
            autoClose: 2000,
          });
        });
    }
  };
  return (
    <>
      {loading ? (
        <LoaderAnimation />
      ) : (
        <div className="lg:flex lg:justify-evenly lg:mx-20 mx-10">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-1">{job.jobTitle}</h1>
            <h1 className="text-sm text-gray-500 capitalize mb-4">
              {job.companyName}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{job.jobDescription}</p>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Skills Required</h2>
              <ul className="list-disc pl-4">
                {job.skills.map((skills, index) => (
                  <li key={index} className="mb-2">
                    {skills}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Experience</h1>
              <p className="text-lg text-gray-600 mb-6">
                {job.experience} years
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Job Type</h2>
              <ul className="list-disc pl-4">
                {job.jobType.map((jobType, index) => (
                  <li key={index} className="mb-2 capitalize">
                    {jobType}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-2 border-gray-200 p-5 rounded-xl relative min-[120px]:pb-20">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Job Details</h2>

              <div>
                <div className="flex">
                  <div>
                    <IconCoinRupee className="bg-gray-200 rounded-full mr-2 my-2 p-2 w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <p className="flex text-lg">{job.salary}</p>
                    <h1 className=" text-sm text-gray-400">Salary</h1>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div>
                    <IconMapPin className="bg-gray-200 rounded-full mr-2 my-2 p-2 w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <p className="flex text-lg">{job.jobLocation}</p>
                    <h1 className=" text-sm text-gray-400">Location</h1>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex">
                  <div>
                    <IconMailFilled className="bg-gray-200 rounded-full mr-2 my-2 p-2 w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <p className="flex text-lg">{job.email}</p>
                    <h1 className=" text-sm text-gray-400">Contact Email</h1>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex">
                  <div>
                    <IconCalendarEvent className="bg-gray-200 rounded-full mr-2 my-2 p-2 w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <p className="flex text-lg">
                      {dateFormat(job.createdAt, "dS mmm yyyy")}
                    </p>
                    <h1 className=" text-sm text-gray-400">Posted On</h1>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleApplyNow(job._id, user?.email)}
                className="absolute bottom-10 left-5 right-5 bg-black text-white px-5 py-2 rounded-full"
              >
                Apply For This Job
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
