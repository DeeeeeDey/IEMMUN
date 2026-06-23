import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate body
    const validatedData = contactSchema.parse(body);

    // Mock sending email
    console.log("Would send email with data:", validatedData);

    // In a real application, you would integrate Resend or Nodemailer here.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'officialiemmun@gmail.com',
    //   subject: `IEMMUN Inquiry: ${validatedData.subject}`,
    //   html: `<p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p><p>${validatedData.message}</p>`
    // });

    // Wait a bit to simulate network delay for the UI to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("API error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
