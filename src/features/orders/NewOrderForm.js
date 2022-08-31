import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from './ordersApiSlice'

const NewOrderForm = ({ users }) => {

    const [createOrder, {
        isError,
        isLoading,
        isSuccess,
        error
    }] = useCreateOrderMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setUserId('')
            setTitle('')
            setText('')
            navigate('/dash/orders')
        }
    }, [isSuccess, navigate])


    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id);

    const errorClass = isError ? 'errmsg' : 'offscreen';
    const validTitleClass = !title && title.length > 0 ? 'form__input--incomplete' : '';
    const validTextClass = !text && text.length > 0 ? 'form__input--incomplete' : '';


    const options = users.map(user => {
        return (
            <option key={user.id} value={user.id}>{user.username}</option>
        )
    })

    const canSave = [text, userId, title].every(Boolean) && !isLoading;

    const createNewOrder = async (e) => {
        e.preventDefault();
        console.log("Order created");
        if (canSave) {
            await createOrder({ user: userId, title, text });
        }
    }

    return (
        <>
            <p className={errorClass}>{error?.data?.message}</p>
            <form className="form" onSubmit={createNewOrder}>
                <div className="form__title-row">
                    <h2>New Order</h2>
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
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO: </label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                >
                    {options}
                </select>

            </form>
        </>
    )
}

export default NewOrderForm