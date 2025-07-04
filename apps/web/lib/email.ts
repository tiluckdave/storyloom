import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export interface EmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

export class EmailService {
	static async sendEmail(options: EmailOptions): Promise<void> {
		try {
			await transporter.sendMail({
				from: process.env.EMAIL_FROM,
				to: options.to,
				subject: options.subject,
				html: options.html,
				text: options.text,
			});
			console.log(`Email sent successfully to ${options.to}`);
		} catch (error) {
			console.error("Error sending email:", error);
			throw error;
		}
	}

	static generateMagicLinkEmail(email: string, url: string): EmailOptions {
		const appName = "StoryLoom";

		const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to ${appName}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f5f5;
            padding: 20px 0;
          }
          .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f5f5f5;
          }
          .container {
            background: #ffffff;
            border-radius: 16px;
            margin: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .logo {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .tagline {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 300;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #2d3748;
            text-align: center;
          }
          .subtitle {
            font-size: 16px;
            color: #718096;
            margin-bottom: 32px;
            text-align: center;
            line-height: 1.5;
          }
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            border: none;
            letter-spacing: 0.5px;
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
          }
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
            margin: 32px 0;
          }
          .link-fallback {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
          }
          .link-fallback strong {
            color: #2d3748;
            font-size: 14px;
            margin-bottom: 8px;
            display: block;
          }
          .link-fallback .url {
            font-size: 13px;
            color: #718096;
            word-break: break-all;
            line-height: 1.4;
          }
          .link-fallback a {
            color: #ff6b35;
            text-decoration: none;
          }
          .security-note {
            background: #fff8f0;
            border: 1px solid #fed7aa;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
          }
          .security-note .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: #f97316;
            border-radius: 50%;
            margin-right: 8px;
            vertical-align: middle;
          }
          .security-note strong {
            color: #c2410c;
            font-size: 14px;
          }
          .security-note p {
            color: #9a3412;
            font-size: 14px;
            margin-top: 8px;
            line-height: 1.4;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            font-size: 13px;
            color: #a0aec0;
            margin: 4px 0;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 12px;
            }
            .header, .content, .footer {
              padding: 30px 20px;
            }
            .title {
              font-size: 22px;
            }
            .button {
              padding: 14px 28px;
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="logo">${appName}</div>
              <div class="tagline">Your Creative Writing Platform</div>
            </div>
            
            <div class="content">
              <h1 class="title">Welcome back!</h1>
              <p class="subtitle">Click the button below to securely sign in to your ${appName} account. This magic link will expire in 24 hours.</p>
              
              <div class="button-container">
                <a href="${url}" class="button">Sign in to ${appName}</a>
              </div>
              
              <div class="divider"></div>
              
              <div class="link-fallback">
                <strong>Having trouble with the button?</strong>
                <div class="url">
                  Copy and paste this link into your browser:<br>
                  <a href="${url}">${url}</a>
                </div>
              </div>
              
              <div class="security-note">
                <div>
                  <span class="icon"></span>
                  <strong>Security Notice</strong>
                </div>
                <p>This sign-in link was requested for ${email}. If you didn't request this, you can safely ignore this email.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This sign-in link will expire in 24 hours for your security.</p>
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

		const text = `
      Sign in to ${appName}
      
      Click the link below to sign in to your account:
      ${url}
      
      This link will expire in 24 hours for your security.
      
      If you didn't request this sign-in link, you can safely ignore this email.
      
      © ${new Date().getFullYear()} ${appName}
    `;

		return {
			to: email,
			subject: `Sign in to ${appName}`,
			html,
			text,
		};
	}

	static generateWelcomeEmail(email: string, name?: string): EmailOptions {
		const appName = "StoryLoom";
		const displayName = name || email.split("@")[0];

		const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ${appName}!</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f5f5;
            padding: 20px 0;
          }
          .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f5f5f5;
          }
          .container {
            background: #ffffff;
            border-radius: 16px;
            margin: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
          }
          .confetti {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: 
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 1px, transparent 1px),
              radial-gradient(circle at 60% 20%, rgba(255,255,255,0.3) 1px, transparent 1px);
            background-size: 40px 40px, 30px 30px, 25px 25px;
          }
          .logo {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
          }
          .welcome-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            z-index: 1;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #2d3748;
            text-align: center;
            line-height: 1.2;
          }
          .emoji {
            font-size: 32px;
            display: inline-block;
            margin-left: 8px;
          }
          .subtitle {
            font-size: 16px;
            color: #718096;
            margin-bottom: 32px;
            text-align: center;
            line-height: 1.5;
          }
          .features {
            margin: 32px 0;
            padding: 0;
            list-style: none;
          }
          .features li {
            padding: 18px 0;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            align-items: flex-start;
            transition: all 0.2s ease;
          }
          .features li:last-child {
            border-bottom: none;
          }
          .features li:hover {
            background: #f8fafc;
            margin: 0 -15px;
            padding: 18px 15px;
            border-radius: 8px;
            border-bottom: 1px solid #f1f5f9;
          }
          .features li:hover:last-child {
            border-bottom: none;
          }
          .feature-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            border-radius: 12px;
            margin-right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
          }
          .feature-content h3 {
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 4px;
          }
          .feature-content p {
            font-size: 14px;
            color: #718096;
            line-height: 1.4;
          }
          .button-container {
            text-align: center;
            margin: 40px 0;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            border: none;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
          }
          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          .button:hover::before {
            left: 100%;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            font-size: 13px;
            color: #a0aec0;
            margin: 4px 0;
          }
          .footer .support {
            color: #718096;
            margin-bottom: 12px;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 12px;
            }
            .header, .content, .footer {
              padding: 30px 20px;
            }
            .title {
              font-size: 24px;
            }
            .button {
              padding: 14px 28px;
              font-size: 15px;
            }
            .feature-icon {
              width: 40px;
              height: 40px;
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="confetti"></div>
              <div class="logo">${appName}</div>
              <div class="welcome-badge">Welcome Aboard!</div>
            </div>
            
            <div class="content">
              <h1 class="title">Welcome to ${appName}, ${displayName}!<span class="emoji">🎉</span></h1>
              <p class="subtitle">We're absolutely thrilled to have you join our community of passionate storytellers and creative writers. Your storytelling journey begins now!</p>
              
              <ul class="features">
                <li>
                  <div class="feature-icon">✨</div>
                  <div class="feature-content">
                    <h3>Create Amazing Stories</h3>
                    <p>Build compelling narratives with our intuitive writing tools and AI-powered suggestions</p>
                  </div>
                </li>
                <li>
                  <div class="feature-icon">🤝</div>
                  <div class="feature-content">
                    <h3>Connect & Collaborate</h3>
                    <p>Join writing communities, share your work, and collaborate with fellow creators</p>
                  </div>
                </li>
                <li>
                  <div class="feature-icon">📊</div>
                  <div class="feature-content">
                    <h3>Track Your Progress</h3>
                    <p>Monitor your writing goals, track daily word counts, and celebrate your achievements</p>
                  </div>
                </li>
              </ul>
              
              <div class="button-container">
                <a href="${
									process.env.NEXTAUTH_URL
								}/dashboard" class="button">Start Your Journey</a>
              </div>
            </div>
            
            <div class="footer">
              <p class="support">Need help getting started? Our friendly support team is here to help you every step of the way.</p>
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

		const text = `
      Welcome to ${appName}, ${displayName}!
      
      We're thrilled to have you join our community of storytellers and creators.
      
      Here's what you can do with ${appName}:
      
      ✨ Create Amazing Stories
      Build compelling narratives with our intuitive tools
      
      🔗 Connect & Collaborate  
      Share your work and collaborate with other creators
      
      📈 Track Your Progress
      Monitor your storytelling journey and improvements
      
      Get started: ${process.env.NEXTAUTH_URL}/dashboard
      
      Need help getting started? Feel free to reach out to our support team.
      
      © ${new Date().getFullYear()} ${appName}
    `;

		return {
			to: email,
			subject: `Welcome to ${appName}! 🎉`,
			html,
			text,
		};
	}

	static async sendWelcomeEmail(email: string, name?: string): Promise<void> {
		const emailOptions = this.generateWelcomeEmail(email, name);
		await this.sendEmail(emailOptions);
	}
}
