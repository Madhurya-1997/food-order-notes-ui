import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef('');
    const [errorMessage, setErrorMessage] = useState('');
    const [login, {
        isLoading,
        isError,
        error
    }] = useLoginMutation();

    useEffect(() => {
        // put focus on username field on component's first render
        usernameRef.current.focus();
    }, [])


    useEffect(() => {
        setErrorMessage('');
    }, [username, password])


    useEffect(() => {

        if (isError) {
            console.log(error)
            const { data, status } = error;

            if (status === 401) setErrorMessage(data?.message)
            if (status && status !== 401) setErrorMessage('Something went wrong. Please try again later !')
        }


    }, [isError])

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const errorClass = errorMessage ? 'errmsg' : 'offscreen';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length < 3) {
            setErrorMessage('Username should have a minimum of 3 characters')
            return;
        }
        if (password.length < 3) {
            setErrorMessage('Password should have a minimum of 3 characters')
            return;
        }

        const { data } = await login({ username, password });
        dispatch(setCredentials(data.accessToken));
        setUsername('')
        setPassword('')
        navigate('/dash')
    }

    if (isLoading) return <p>Loading...</p>


    const content = (
        <section className='public '>
            <header>
                <h1>Employee Login</h1>
            </header>

            <main className='login'>
                <p className={errorClass} aria-live='assertive'>{errorMessage}</p>


                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input
                        className='form__input'
                        type='text'
                        id='username'
                        name='username'
                        ref={usernameRef}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete='off'
                    />

                    <label htmlFor='password'>Password:</label>
                    <input
                        className='form__input'
                        type='password'
                        id='password'
                        name='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <button className='form__submit-button'>Sign In</button>
                </form>

            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )
    return content;
}

export default Login