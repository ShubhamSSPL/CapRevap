/**
 * Registration Module Routes
 */

import { RouteObject } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import OTPVerification from './pages/OTPVerification';
import RegistrationSuccess from './pages/RegistrationSuccess';

export const registrationRoutes: RouteObject = {
  path: '/registration',
  children: [
    {
      index: true,
      element: <RegistrationForm />,
    },
    {
      path: 'verify-otp',
      element: <OTPVerification />,
    },
    {
      path: 'success',
      element: <RegistrationSuccess />,
    },
  ],
};
