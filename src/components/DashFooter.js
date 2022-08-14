import React from 'react'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashFooter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoHomeButtonClicked = () => navigate('/dash');

    let goHomeButton = null;

    if (location.pathname !== '/dash') {
        goHomeButton = (
            <button className='dash-footer__button icon-button' title='Home' onClick={onGoHomeButtonClicked}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User: </p>
            <p>Status: </p>
        </footer>
    )
    return content;
}

export default DashFooter