// this page is the layout once the employee logins
// protected component layout
// Outlet is the component that will be rendered based on the route
// Welcome component is the component that will be rendered when the route is /dash

import React from 'react'
import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'
import DashHeader from './DashHeader'

const DashLayout = () => {
    return (

        <>
            <DashHeader />
            <div className='dash-container'>
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout