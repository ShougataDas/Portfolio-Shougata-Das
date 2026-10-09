import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const LIMITS = { name: 100, email: 100, subject: 150, message: 5000 }

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    // Honeypot: real visitors never see this field
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
    }

    const fields = {} as Record<keyof typeof LIMITS, string>
    for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
      const value = typeof body[key] === "string" ? body[key].trim() : ""
      if (!value) return NextResponse.json({ error: "All fields are required" }, { status: 400 })
      if (value.length > LIMITS[key]) {
        return NextResponse.json({ error: `${key} is too long` }, { status: 400 })
      }
      fields[key] = value
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const name = escapeHtml(fields.name)
    const email = escapeHtml(fields.email)
    const subject = escapeHtml(fields.subject)
    const message = escapeHtml(fields.message).replace(/\n/g, "<br>")

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["shougatad@gmail.com"],
      // Strip line breaks so the subject header can't be split
      subject: `Portfolio Contact: ${fields.subject.replace(/[\r\n]+/g, " ")}`,
      replyTo: fields.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #15803d; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f6f7f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dde2e8; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #212529;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #6c757d;">
            Sent from your portfolio contact form. Reply to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
