import { createClient } from '@hyper-fetch/core';
import { DevtoolsPlugin } from '@hyper-fetch/plugin-devtools';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined in environment variables');
}

// Single entry point — all requests inherit this base URL
export const client = createClient({ url: BASE_URL }).addPlugin(
  DevtoolsPlugin({
    appName: 'Bharat Book of Records',
    // debug: process.env.NODE_ENV === 'development',
    // environment: process.env.NODE_ENV,
    url: 'ws://localhost:2137',
  }),
);

// setParams is typed from the endpoint string, send() returns typed data
// const { data, error } = await getUser.setParams({ userId: 1 }).send();
