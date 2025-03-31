export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: '3c80ebaa-b040-451f-ac61-b03bda128e74',
      authority: 'https://login.microsoftonline.com/ed03816d-2e9a-44a8-977a-c69b5b3724d0/',
    },
  },
  apiConfig: {
    scopes: ['User.Read.All'],
    uri: 'http://localhost:4200',
  },
};
