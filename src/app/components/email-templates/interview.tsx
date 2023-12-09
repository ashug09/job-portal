import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  companyName: string;
}

export const interview: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  companyName,
}) => (
  <div>
    <h1>Hello!, {firstName}!</h1>
    <h5 className="capitalize">
      You are shortlited for the interview by {companyName}
    </h5>
    <p>employer will reach you out soon !!</p>
  </div>
);
