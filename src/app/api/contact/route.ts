import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, Nodemailer, etc.)
    // For now, just log and return success
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email with Resend (uncomment when ready)
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@yourdomain.com>',
    //   to: 'your@email.com',
    //   subject: `New Contact: ${body.name}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
    // });

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
