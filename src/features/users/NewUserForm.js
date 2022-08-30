import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from './usersApiSlice'


const USERNAME_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewUserForm = () => {
    const [createUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState([]);


    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate("/dash/users")
        }
    }, [isSuccess, navigate])



    const createNewUser = async (e) => {
        e.preventDefault();

        if (canSave) {
            await createUser({ username, password, roles })
        }
    }


    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPasswordClass = !validPassword ? 'form__input--incomplete' : ''
    const errClass = isError ? "errmsg" : "offscreen"


    const handleCheckbox = type => {
        roles.includes(type) ?
            setRoles(roles.filter(role => role !== type)) :
            setRoles([...roles, type])
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading


    return (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={createNewUser}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

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

export default NewUserForm