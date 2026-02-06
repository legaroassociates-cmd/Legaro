
export async function onRequestPost(context) {
  try {
    const { email, name, bookingId, date, timeSlot, category, amount } = await context.request.json();

    if (!email || !bookingId) {
      return new Response(JSON.stringify({ error: 'Missing required booking details' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Modern, Responsive Email Template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmed</title>
      <style>
        body { margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 40px; margin-bottom: 40px; }
        .header { background: linear-gradient(135deg, #1E2535 0%, #0F172A 100%); padding: 40px 20px; text-align: center; }
        .logo { color: #C5A059; font-size: 28px; font-weight: 700; letter-spacing: 1px; text-decoration: none; font-family: Georgia, serif; }
        .content { padding: 40px 30px; }
        .booking-id { text-align: center; margin-bottom: 30px; }
        .booking-id span { background-color: #F0F9FF; color: #1E2535; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border: 1px solid #BAE6FD; }
        h1 { color: #1E2535; font-size: 24px; font-weight: 700; margin: 0 0 10px 0; text-align: center; }
        p.subtitle { color: #64748B; font-size: 16px; text-align: center; margin: 0 0 30px 0; line-height: 1.5; }
        .details-box { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 25px; margin-bottom: 30px; }
        .detail-row { display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding: 12px 0; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #64748B; font-size: 14px; font-weight: 500; }
        .value { color: #1E2535; font-size: 14px; font-weight: 600; text-align: right; }
        .cta-button { display: block; width: 100%; background: linear-gradient(135deg, #C5A059 0%, #B88A44 100%); color: #ffffff; text-decoration: none; text-align: center; padding: 16px 0; border-radius: 6px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; margin-top: 20px; text-transform: uppercase; }
        .footer { background-color: #1E2535; padding: 30px; text-align: center; }
        .footer p { color: #94A3B8; font-size: 12px; margin: 5px 0; line-height: 1.5; }
        .footer a { color: #C5A059; text-decoration: none; }
        
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .container { margin-top: 20px; margin-bottom: 20px; width: 100%; border-radius: 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">LEGARO</div>
        </div>
        <div class="content">
          <div class="booking-id">
            <span>ID: ${bookingId}</span>
          </div>
          <h1>Booking Confirmed!</h1>
          <p class="subtitle">Dear ${name}, your consultation has been successfully scheduled. We are prepared to assist you.</p>
          
          <div class="details-box">
            <div class="detail-row">
              <span class="label">Service:</span>
              <span class="value">${category}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${timeSlot}</span>
            </div>
            <div class="detail-row">
              <span class="label">Amount Paid:</span>
              <span class="value">₹${amount}</span>
            </div>
          </div>
          
          <p style="text-align: center; color: #64748B; font-size: 14px; margin-bottom: 30px;">
            A legal expert will review your case details and contact you at the scheduled time.
          </p>

          
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Legaro Associates. All rights reserved.</p>
          <p>Chennai, India | <a href="mailto:support@legaro.in">support@legaro.in</a></p>
        </div>
      </div>
    </body>
    </html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'support@legaro.in', // Change to verified domain in prod
        to: [email],
        subject: `Booking Confirmed: ${category} - ${bookingId}`,
        html: htmlContent,
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
