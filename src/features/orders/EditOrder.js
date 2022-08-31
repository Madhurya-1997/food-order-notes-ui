import React from 'react'
import { useParams } from 'react-router-dom'
import EditOrderForm from './EditOrderForm'

const EditOrder = () => {
    const { id } = useParams();

    const content = <EditOrderForm orderId={id} />
    return content;
}

export default EditOrder