import React from 'react'
import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Public from './components/Public';
import Welcome from './features/auth/Welcome';
import UsersList from './features/users/UsersList';
import OrdersList from './features/orders/OrdersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditOrder from './features/orders/EditOrder';
import NewOrder from './features/orders/NewOrder';
import Prefetch from './features/auth/Prefetch';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path='dash' element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path='users'>
              <Route index element={<UsersList />} />
              <Route path=':id' element={<EditUser />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>
            <Route path='orders'>
              <Route index element={<OrdersList />} />
              <Route path=':id' element={<EditOrder />} />
              <Route path='new' element={<NewOrder />} />
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App