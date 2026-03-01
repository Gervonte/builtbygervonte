import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isAsciiLetterOrDigit(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) // a-z
  );
}

function isValidEmailAddress(input: string): boolean {
  if (input.length < 3 || input.length > 254) {
    return false;
  }

  const atIndex = input.indexOf('@');
  if (atIndex <= 0 || atIndex !== input.lastIndexOf('@') || atIndex === input.length - 1) {
    return false;
  }

  const localPart = input.slice(0, atIndex);
  const domainPart = input.slice(atIndex + 1);

  if (localPart.length > 64 || domainPart.length < 3) {
    return false;
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.') || !domainPart.includes('.')) {
    return false;
  }

  for (let i = 0; i < localPart.length; i++) {
    const char = localPart[i];
    if (
      !isAsciiLetterOrDigit(char) &&
      char !== '.' &&
      char !== '_' &&
      char !== '%' &&
      char !== '+' &&
      char !== '-'
    ) {
      return false;
    }
  }

  const labels = domainPart.split('.');
  for (const label of labels) {
    if (!label || label.length > 63 || label.startsWith('-') || label.endsWith('-')) {
      return false;
    }

    for (let i = 0; i < label.length; i++) {
      const char = label[i];
      if (!isAsciiLetterOrDigit(char) && char !== '-') {
        return false;
      }
    }
  }

  // TLD should be alphabetic and at least 2 chars.
  const tld = labels[labels.length - 1];
  if (tld.length < 2) {
    return false;
  }
  for (let i = 0; i < tld.length; i++) {
    const char = tld[i];
    const code = char.charCodeAt(0);
    const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    if (!isLetter) {
      return false;
    }
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is properly configured
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format with linear-time checks (no regex backtracking risk)
    if (!isValidEmailAddress(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'BuiltByGervonte Contact Form <contact@builtbygervonte.com>', // Resend's verified domain
      to: ['hello@builtbygervonte.com'], // Your verified email address
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E91E63;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2; font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `,
      replyTo: email, // Allow you to reply directly to the sender
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
