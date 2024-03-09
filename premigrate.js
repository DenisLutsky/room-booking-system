/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

if (process.env.NODE_ENV !== 'development') {
  console.error(
    `You are trying to run a development script in a non-development environment. Please set the NODE_ENV environment variable to 'development' and try again.`,
  );
  process.exit(1);
}
