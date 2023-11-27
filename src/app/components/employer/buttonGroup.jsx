import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function ButtonGroup({ email, name }) {
  return (
    <Button.Group className="flex justify-center mt-5">
      <Button variant="outline" color="blue">
        <Link href="/components/employer">Post Job</Link>
      </Button>
      <Button variant="outline" color="blue">
        <Link
          href={{
            pathname: "/components/employer/employerProfile",
            query: { email: email, name: name },
          }}
        >
          View Profile
        </Link>
      </Button>
    </Button.Group>
  );
}
