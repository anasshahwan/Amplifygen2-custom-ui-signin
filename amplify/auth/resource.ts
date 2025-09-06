import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Welcome to Our App!',
      verificationEmailBody: (createCode) => `
          
                      <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #f4f7fa;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 2rem auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        padding: 2rem;
      }
      .header {
        text-align: center;
        color: #4a90e2;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      .message {
        font-size: 1rem;
        color: #333;
        margin-bottom: 1.5rem;
        text-align: center;
      }
      .credentials {
        background: #f0f4f8;
        border-radius: 6px;
        padding: 1rem;
        font-size: 1rem;
        line-height: 1.6;
        text-align: center;
        color: #222;
      }
      .footer {
        margin-top: 2rem;
        font-size: 0.85rem;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Welcome to Our Platform!</div>

      <div class="message">
        We're happy to have you! You can now login with the following details:
      </div>

      <div class="credentials">
                Use this code to confirm your account: ${createCode()}

     <h1>Verify Your Email</h1>
      </div>

      <div class="footer">
        Please make sure to change your password after logging in for the first
        time.
      </div>
    </div>
  </body>
</html>
          
          
          
          
          `,
    },
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['profile', 'email'],
        attributeMapping: {
          email: 'email',
          preferredUsername: 'name',
        },
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
        scopes: ['email'],
        attributeMapping: {
          email: 'email',
          preferredUsername: 'name',
        },
      },
      callbackUrls: [
        'http://localhost:4200/profile',
        'https://yoursite.com/profile',
      ],
      logoutUrls: ['http://localhost:4200/signin', 'https://yoursite.com'],
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    },
    'custom:companyName': {
      dataType: 'String',
      mutable: true,
    },
  },
});
