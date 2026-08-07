export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
      },
      body: JSON.stringify({
        sender: { 
          name: "Placement Prep Tracker", 
          email: process.env.BREVO_SENDER_EMAIL 
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      throw new Error(errorData.message || "Failed to send email");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Email error:", error);
    throw new Error(error.message);
  }
}