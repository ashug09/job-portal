import { newJobPost } from "../../../components/email-templates/newJobPost";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await resend.emails.send({
      from: "Job Portal <onboarding@resend.dev>",
      to: body.emails,
      subject: "New Job",
      react: newJobPost({
        firstName: "Candidate",
        companyName: body.companyName,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
