import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
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
