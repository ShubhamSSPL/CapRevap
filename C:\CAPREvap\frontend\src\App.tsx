/**
 * Root Application Component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './shared/store/store';
import { registrationRoutes } from './modules/registration';
import './App.css';

// Define all routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>CAP Admission Portal</h1>
        <p>Welcome to the Centralized Admission Process Portal</p>
        <div style={{ marginTop: '20px' }}>
          <a href="/registration" style={{ marginRight: '20px' }}>
            New Registration
          </a>
          <a href="/login">Login</a>
        </div>
      </div>
    ),
  },
  registrationRoutes,
  {
    path: '/login',
    element: <div style={{ padding: '40px' }}>Login Page (Coming Soon)</div>,
  },
];

// Create router
const router = createBrowserRouter(routes);

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#0e3f8a',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    fontSize: 14,
    fontFamily: 'Verdana, Arial, sans-serif',
  },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
