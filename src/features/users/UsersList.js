import React from 'react'
import User from './User';
import { useGetUsersQuery } from './usersApiSlice'

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 50000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    });

    let content;

    if (isLoading) return <div>Loading...</div>

    if (isError) {
        console.log(error)
        content = <p className='errmsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : null;

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}

export default UsersList