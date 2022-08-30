import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';


const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.data.map(user => {
                    user.id = user._id
                    return user;
                })
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providedTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }];
            }
        }),
        createUser: builder.mutation({
            query: newUser => ({
                url: '/users',
                method: 'POST',
                body: { ...newUser }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        updateUser: builder.mutation({
            query: updatedUser => ({
                url: '/users',
                method: 'PUT',
                body: { ...updatedUser }
            }),
            invalidatesTags: (result, error, args) => [{ type: 'User', id: args.id }]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [{ type: 'User', id: args.id }]
        })
    })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice;


// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids and entities
)

// getSelector creates these selectors
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);




