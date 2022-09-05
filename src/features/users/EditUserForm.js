import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'


const USERNAME_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [active, setActive] = useState(user.active)
    const [roles, setRoles] = useState(user.roles)


    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDeleteSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDeleteSuccess, navigate])


    const validUsernameClass = !validUsername ? 'form__input--incomplete' : ''
    const validPasswordClass = (!validPassword && password) ? 'form__input--incomplete' : ''
    const errorMessage = (error?.data?.message || deleteError?.data?.message) ?? ''


    const onUpdateUser = async () => {
        console.log("Updated")

        if (password) {
            await updateUser({ id: user.id, username, password, active, roles })
        } else {
            await updateUser({ id: user.id, username, password: user.password, active, roles })
        }
    }
    const onDeleteUser = async () => {
        await deleteUser({ id: user.id })
    }

    const handleCheckbox = type => {
        roles.includes(type) ?
            setRoles(roles.filter(role => role !== type)) :
            setRoles([...roles, type])
    }

    let canSave;

    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
    }


    return (
        <>
            <p className={errorMessage}>{error?.data?.message}</p>


            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onUpdateUser}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUser}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUsernameClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={() => setActive(prev => !prev)}
                    />
                </label>

                <label className="form__label form__label--title" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <div className='form__options'>
                    <label className="form__label form__checkbox-container" htmlFor="employee-active">
                        Employee:
                        <input
                            className="form__checkbox"
                            id="employee-active"
                            name="employee-active"
                            type="checkbox"
                            checked={roles.includes('Employee')}
                            onChange={() => handleCheckbox('Employee')}
                        />
                    </label>
                    <label className="form__label form__checkbox-container" htmlFor="manager-active">
                        Manager:
                        <input
                            className="form__checkbox"
                            id="manager-active"
                            name="manager-active"
                            type="checkbox"
                            checked={roles.includes('Manager')}
                            onChange={() => handleCheckbox('Manager')}
                        />
                    </label>
                    <label className="form__label form__checkbox-container" htmlFor="admin-active">
                        Admin:
                        <input
                            className="form__checkbox"
                            id="admin-active"
                            name="admin-active"
                            type="checkbox"
                            checked={roles.includes('Admin')}
                            onChange={() => handleCheckbox('Admin')}
                        />
                    </label>
                </div>

            </form>

        </>
    )
}

export default EditUserForm