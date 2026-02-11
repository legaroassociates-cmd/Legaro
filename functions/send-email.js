
export async function onRequestPost(context) {
    try {
        const { to, subject, templateType, data } = await context.request.json();

        if (!to || !subject || !templateType) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let htmlContent = '';

        // Common CSS
        const style = `
      body { margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 40px; }
      .header { background: #1E2535; padding: 30px; text-align: center; }
      .logo { color: #C5A059; font-size: 24px; font-weight: 700; font-family: Georgia, serif; }
      .content { padding: 40px 30px; }
      h1 { color: #1E2535; font-size: 22px; margin: 0 0 20px 0; }
      p { color: #64748B; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
      .btn { display: inline-block; background: #C5A059; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
      .footer { background: #F1F5F9; padding: 20px; text-align: center; font-size: 12px; color: #94A3B8; }
    `;

        // Template Selection
        switch (templateType) {
            case 'booking_confirmation':
                htmlContent = `
          <!DOCTYPE html>
          <html><head><style>${style}</style></head><body>
            <div class="container">
              <div class="header"><div class="logo">LEGARO</div></div>
              <div class="content">
                <h1>Booking Confirmed</h1>
                <p>Dear ${data.name},</p>
                <p>Your consultation for <strong>${data.category}</strong> has been confirmed.</p>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${data.date}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${data.slot}</p>
                  <p style="margin: 5px 0;"><strong>Lawyer:</strong> ${data.lawyerName}</p>
                </div>
                <p>Please be ready 5 minutes prior to the scheduled time.</p>
              </div>
              <div class="footer">&copy; ${new Date().getFullYear()} Legaro Associates</div>
            </div>
          </body></html>`;
                break;

            case 'interview_invite':
                htmlContent = `
          <!DOCTYPE html>
          <html><head><style>${style}</style></head><body>
            <div class="container">
              <div class="header"><div class="logo">LEGARO</div></div>
              <div class="content">
                <h1>Interview Invitation</h1>
                <p>Dear ${data.name},</p>
                <p>We are pleased to invite you for an interview regarding your partnership application with Legaro Associates.</p>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Scheduled Time:</strong> ${data.interviewDate}</p>
                </div>
                <p>Please ensure you are available at the mentioned time. Our team will contact you via phone/video call.</p>
              </div>
              <div class="footer">&copy; ${new Date().getFullYear()} Legaro Associates</div>
            </div>
          </body></html>`;
                break;

            case 'onboarding_link':
                htmlContent = `
          <!DOCTYPE html>
          <html><head><style>${style}</style></head><body>
            <div class="container">
              <div class="header"><div class="logo">LEGARO</div></div>
              <div class="content">
                <h1>Welcome to Legaro!</h1>
                <p>Dear ${data.name},</p>
                <p>Congratulations! We are excited to have you on board as a Legal Partner.</p>
                <p>To complete your registration and set up your profile on our platform, please click the link below to fill out your details.</p>
                <p><strong>Your Access Credentials:</strong><br/>
                Username: ${data.firstName}<br/>
                Passcode: ${data.dob}</p>
                <a href="${data.link}" class="btn">Complete Onboarding</a>
              </div>
              <div class="footer">&copy; ${new Date().getFullYear()} Legaro Associates</div>
            </div>
          </body></html>`;
                break;

            default:
                htmlContent = `<p>${data.message || 'Notification from Legaro'}</p>`;
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'support@legaro.in',
                to: [to],
                subject: subject,
                html: htmlContent,
            }),
        });

        const respData = await resendResponse.json();

        if (!resendResponse.ok) {
            return new Response(JSON.stringify(respData), { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(respData), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
