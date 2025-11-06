/**
 * useOTPVerification Hook
 * Handle OTP verification and resend
 */

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/shared/store/store';
import { RegistrationService } from '../services/registration.service';
import {
  startOTPVerification,
  otpVerificationSuccess,
  otpVerificationFailed,
  startResendOTP,
  resendOTPSuccess,
  resendOTPFailed,
  decrementResendTimer,
  goToSuccessStep,
} from '../store/registrationSlice';

export const useOTPVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    applicationId,
    mobileNumber,
    email,
    otpSent,
    otpVerified,
    otpResendCount,
    otpResendTimer,
    isVerifyingOTP,
    isResendingOTP,
    otpError,
  } = useSelector((state: RootState) => state.registration);

  /**
   * Timer countdown for resend OTP
   */
  useEffect(() => {
    if (otpResendTimer > 0) {
      const timer = setInterval(() => {
        dispatch(decrementResendTimer());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpResendTimer, dispatch]);

  /**
   * Verify OTP
   */
  const verifyOTP = useCallback(
    async (otp: string) => {
      if (!applicationId) {
        return { success: false, error: 'Application ID not found' };
      }

      dispatch(startOTPVerification());

      try {
        const response = await RegistrationService.verifyOTP({
          applicationId,
          otp,
        });

        if (response.success && response.verified) {
          dispatch(otpVerificationSuccess());
          dispatch(goToSuccessStep());
          navigate('/registration/success');
          return { success: true };
        } else {
          const errorMessage = response.message || 'Invalid OTP';
          dispatch(otpVerificationFailed(errorMessage));
          return { success: false, error: errorMessage };
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'OTP verification failed';
        dispatch(otpVerificationFailed(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [applicationId, dispatch, navigate]
  );

  /**
   * Resend OTP
   */
  const resendOTP = useCallback(async () => {
    if (!applicationId) {
      return { success: false, error: 'Application ID not found' };
    }

    if (otpResendCount >= 3) {
      return {
        success: false,
        error: 'Maximum resend attempts reached. Please try after some time.',
      };
    }

    if (otpResendTimer > 0) {
      return {
        success: false,
        error: `Please wait ${otpResendTimer} seconds before resending`,
      };
    }

    dispatch(startResendOTP());

    try {
      const response = await RegistrationService.resendOTP({ applicationId });

      if (response.success && response.otpSent) {
        dispatch(resendOTPSuccess());
        return { success: true, message: 'OTP sent successfully' };
      } else {
        const errorMessage = response.message || 'Failed to resend OTP';
        dispatch(resendOTPFailed(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to resend OTP';
      dispatch(resendOTPFailed(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [applicationId, otpResendCount, otpResendTimer, dispatch]);

  return {
    // State
    applicationId,
    mobileNumber,
    email,
    otpSent,
    otpVerified,
    otpResendCount,
    otpResendTimer,

    // Loading
    isVerifyingOTP,
    isResendingOTP,

    // Error
    otpError,

    // Methods
    verifyOTP,
    resendOTP,

    // Computed
    canResend: otpResendTimer === 0 && otpResendCount < 3,
    maxAttemptsReached: otpResendCount >= 3,
  };
};
