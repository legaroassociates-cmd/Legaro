
export async function onRequestPost(context) {
    try {
        const { email, otp } = await context.request.json();

        if (!email || !otp) {
            return new Response(JSON.stringify({ error: 'Email and OTP are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'support@legaro.in',
                to: [email],
                subject: 'Your Legaro Verification Code',
                html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <div style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
              <div style="background: #1E2535; padding: 30px; text-align: center;">
                <span style="color: #C5A059; font-size: 24px; font-weight: 700; font-family: serif; letter-spacing: 1px;">LEGARO</span>
              </div>
              <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #1E2535; margin: 0 0 15px 0; font-size: 22px;">Verify Your Identity</h2>
                <p style="color: #64748B; font-size: 15px; margin: 0 0 30px 0; line-height: 1.5;">
                  Use the following code to complete your booking. This code is valid for 10 minutes.
                </p>
                <div style="background-color: #F1F5F9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                  <span style="font-size: 32px; font-weight: 700; color: #1E2535; letter-spacing: 8px; font-family: monospace;">${otp}</span>
                </div>
                <p style="color: #94A3B8; font-size: 12px;">
                  If you didn't request this, you can safely ignore this email.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
            }),
        });

        const data = await resendResponse.json();

        if (!resendResponse.ok) {
            return new Response(JSON.stringify(data), { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
