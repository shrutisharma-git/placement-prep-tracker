import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
) {
  const { data, error } = await resend.emails.send({
    from: "Prep Tracker <onboarding@resend.dev>",
    to,
    subject,
    html: htmlContent,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}