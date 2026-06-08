import { client } from './client';
import { Post } from './data';

// Define a request with typed response — :userId becomes a required param
export const getPosts = client.createRequest<{
  response: Post[];
}>()({
  endpoint: '/data/fb_posts_107248091187807.json',
  method: 'GET',
});

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// POST request — define both response and payload types
// const createUser = client.createRequest<{
//   response: User;
//   payload: Pick<User, 'name' | 'email'>;
// }>()({
//   endpoint: '/users',
//   method: 'POST',
// });

// Define allowed query params — all are optional and type-checked
// const listUsers = client.createRequest<{
//   response: User[];
//   queryParams: { page?: number; limit?: number; search?: string };
// }>()({
//   endpoint: '/users',
//   method: 'GET',
// });

// Query params are appended to the URL: /users?page=1&limit=20&search=john
// const { data } = await listUsers
//   .setQueryParams({ page: 1, limit: 20, search: "john" })
//   .send();

// Transform the response before it reaches your code
// export const getPostTrabsformed = client
//   .createRequest<{ response: Post }>()({
//     endpoint: '/data/fb_posts_107248091187807.json',
//     method: 'GET',
//   })
//   .setResponseMapper((response) => ({
//     ...response,
//     data: {
//       // ...response.data,
//       // name: response.data?.id: crypto.randomUUID()
//     },
//   }));
