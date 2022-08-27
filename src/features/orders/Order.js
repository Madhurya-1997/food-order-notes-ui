import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectOrderById } from './ordersApiSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Order = ({ orderId }) => {
    const order = useSelector(state => selectOrderById(state, orderId));
    const navigate = useNavigate();

    const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const updated = new Date(order.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })


    if (order) {
        return (
            <tr className="table__row">
                <td className="table__cell order__status">
                    {order.completed
                        ? <span className="order__status--completed">Completed</span>
                        : <span className="order__status--open">Open</span>
                    }
                </td>
                <td className="table__cell order__created">{created}</td>
                <td className="table__cell order__updated">{updated}</td>
                <td className="table__cell order__title">{order.title}</td>
                <td className="table__cell order__username">{order.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={() => { }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>)

    } else return null;
}

export default Order