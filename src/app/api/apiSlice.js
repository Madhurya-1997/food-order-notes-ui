import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3500' : 'http://foodorderapi-env.eba-z8gcuz3i.ap-south-1.elasticbeanstalk.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Order', 'User'],
    endpoints: builder => ({})
})