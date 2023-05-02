import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const userAPI = createApi({
  reducerPath: 'userAPI',

  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:8989/users',
  }),

  tagTypes: ['auth'],

  endpoints: builder => ({
    userSignUp: builder.mutation({
      query: user => ({
        url: '/register',
        method: 'POST',
        data: user,
      }),
      invalidatesTags: ['auth'],
    }),

    userLogIn: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        data: user,
      }),
      invalidatesTags: ['auth'],
    }),

    userLogOut: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserLogInMutation,
  useUserLogOutMutation,
  useGetCurrentUserQuery,
} = userAPI;
