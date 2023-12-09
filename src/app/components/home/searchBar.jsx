"use client";
import React from "react";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import JobCard from "./jobCard";
import LoaderAnimation from "@/app/loader";
export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const handleSearch = (name) => {
    if (!name) {
      notifications.show({
        title: "Please enter a job name to search",
        autoClose: 5000,
        color: "red",
        icon: <IconSearch />,
      });
    } else {
      setLoading(true);
      axios
        .post(`/api/search`, { name: name })
        .then((res) => {
          console.log(res.data.job);
          if (res.data.job.length === 0) {
            setLoading(false);
            notifications.show({
              title: "No jobs found",
              autoClose: 5000,
              color: "red",
              icon: <IconSearch />,
            });
          } else {
            setJobs(res.data.job);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="bg-gray-100 p-5">
        <div className="flex">
          <IconSearch
            onClick={() => handleSearch(search)}
            className="bg-gray-200 rounded-full mr-2 p-2 
        w-11 h-11 "
          />
          <input
            className="rounded-full p-2 w-full flex justify-center border-2 border-gray-200"
            type="text"
            placeholder="Search for jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {jobs.length > 0 ? (
        <JobCard jobs={jobs} />
      ) : loading ? (
        <LoaderAnimation />
      ) : null}
    </>
  );
}
