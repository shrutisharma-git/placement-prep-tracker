export function verificationEmailTemplate(
    name: string,
    otp: string
  ) {
    return `
      <div style="font-family: Arial; padding:20px;">
        <h2>Hello ${name} 👋</h2>
  
        <p>Welcome to PrepTracker.</p>
  
        <p>Your verification code is:</p>
  
        <h1 style="
        letter-spacing:5px;
        color:#2563eb;
        ">
          ${otp}
        </h1>
  
        <p>This OTP is valid for 10 minutes.</p>
  
        <p>If you didn't request this email, ignore it.</p>
  
        <br>
  
        <p>
        Team PrepTracker ❤️
        </p>
      </div>
    `;
  }