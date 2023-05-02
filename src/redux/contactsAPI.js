import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const contactsApi = createApi({
  reducerPath: 'contacts',

  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/contacts',
  }),

  tagTypes: ['Contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '',
      providesTags: ['Contacts'],
    }),

    getContactById: builder.query({
      query: id => `/${id}`,
      providesTags: ['Contacts'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        url: '',
        method: 'POST',
        data: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    removeContact: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),

    editContact: builder.mutation({
      query: ({ contact, id }) => ({
        url: `/${id}`,
        method: 'PATCH',
        data: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
  useRemoveContactMutation,
  useEditContactMutation,
} = contactsApi;
