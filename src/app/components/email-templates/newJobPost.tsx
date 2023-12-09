import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  companyName: string;
}

export const newJobPost: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  companyName,
}) => (
  <div>
    <h1>Hello!, {firstName}!</h1>
    <h5 className="capitalize">New job posted by {companyName}</h5>
    <p>check out now !!</p>
  </div>
);
