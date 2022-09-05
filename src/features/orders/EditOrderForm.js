import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDeleteOrderMutation, useUpdateOrderMutation } from './ordersApiSlice';

const EditOrderForm = ({ order, users }) => {
    const [updateOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateOrderMutation();

    const [deleteOrder, {
        isDeleteLoading,
        isDeleteSuccess,
        isDeleteError,
        deleteError
    }] = useDeleteOrderMutation();

    console.log(order, users)

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess || isDeleteSuccess) {
            setText('')
            setTitle('')
            navigate('/dash/orders')
        }
    }, [isSuccess, isDeleteSuccess, navigate])

    const [title, setTitle] = useState(order.title);
    const [text, setText] = useState(order.text);
    const [completed, setCompleted] = useState(order.completed);
    const [userId, setUserId] = useState(order.user);

    const options = users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
    ))

    const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(order.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDeleteError) ? 'errmsg' : 'offscreen'
    const validTitleClass = !title ? 'form__input--incomplete' : ''
    const validTextClass = !text ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || deleteError?.data?.message) ?? ''

    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    const onUpdateOrder = async () => {
        if (canSave) {
            await updateOrder({ id: order.id, user: userId, text, title, completed })
        }
    }
    const onDeleteOrder = async () => {
        await deleteOrder({ id: order.id })
    }


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Order #{order.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onUpdateOrder}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteOrder}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="order-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="order-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <label className="form__label" htmlFor="order-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="order-text"
                    name="text"
                    rows={3}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="order-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="order-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={() => setCompleted(!completed)}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="order-username">
                            ASSIGNED TO:</label>
                        <select
                            id="order-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )
    return content;
}

export default EditOrderForm