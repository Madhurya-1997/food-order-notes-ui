import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: creds => ({
                url: '/auth',
                method: 'POST',
                body: creds
            })
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    console.log('Logging out: ', res);
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.error(err)
                }
            }
        })
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation
} = authApiSlice;