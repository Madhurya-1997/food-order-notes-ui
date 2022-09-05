import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const DashHeader = () => {

    const [logout, { isLoading, isSuccess, isError, error }] = useLogoutMutation();

    const navigate = useNavigate();

    useEffect(() => { isSuccess && navigate('/') }, [isSuccess, navigate])


    if (isLoading) return <p>Logging out...</p>
    if (isError) return <p>{error?.data?.message}</p>

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={() => logout()}>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )
    const content = (
        <header className="dash-header">
            <div className='dash-header__container'>
                <Link to="/dash">
                    <h1 className="dash-header__title">orderNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons */}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )
    return content;
}

export default DashHeader