import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://foodorderapi-env.eba-z8gcuz3i.ap-south-1.elasticbeanstalk.com' }),
    tagTypes: ['Order', 'User'],
    endpoints: builder => ({})
})