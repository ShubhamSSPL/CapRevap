/**
 * useRegistration Hook
 * Main hook for registration flow
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/shared/store/store';
import {
  RegistrationFormData,
  ExamValidationRequest,
} from '../types/registration.types';
import { RegistrationService } from '../services/registration.service';
import {
  updateFormData,
  startExamValidation,
  examValidationSuccess,
  examValidationFailed,
  startRegistration,
  registrationSuccess as registrationSuccessAction,
  registrationFailed,
  goToOTPStep,
  clearErrors,
} from '../store/registrationSlice';

export const useRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state: RootState) => state.registration);

  /**
   * Validate exam details
   */
  const validateExam = useCallback(
    async (data: ExamValidationRequest) => {
      dispatch(startExamValidation());

      try {
        const response = await RegistrationService.validateExam(data);

        if (response.valid && response.candidateName) {
          dispatch(
            examValidationSuccess({ candidateName: response.candidateName })
          );
          return { success: true, candidateName: response.candidateName };
        } else {
          const errorMessage =
            response.message || 'Exam validation failed. Please check your details.';
          dispatch(examValidationFailed(errorMessage));
          return { success: false, error: errorMessage };
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to validate exam details';
        dispatch(examValidationFailed(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch]
  );

  /**
   * Submit registration form
   */
  const register = useCallback(
    async (data: RegistrationFormData) => {
      dispatch(startRegistration());

      try {
        const response = await RegistrationService.register(data);

        if (response.success && response.applicationId) {
          dispatch(
            registrationSuccessAction({
              applicationId: response.applicationId,
              mobile: data.mobileNo,
              email: data.email,
            })
          );
          dispatch(goToOTPStep());
          navigate('/registration/verify-otp');
          return { success: true, applicationId: response.applicationId };
        } else {
          const errorMessage = response.message || 'Registration failed';
          dispatch(registrationFailed(errorMessage));
          return { success: false, error: errorMessage };
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to register. Please try again.';
        dispatch(registrationFailed(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch, navigate]
  );

  /**
   * Update form data in store
   */
  const updateForm = useCallback(
    (data: Partial<RegistrationFormData>) => {
      dispatch(updateFormData(data));
    },
    [dispatch]
  );

  /**
   * Clear all errors
   */
  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return {
    // State
    formData: state.formData,
    applicationId: state.applicationId,
    currentStep: state.currentStep,

    // Loading states
    isValidatingExam: state.isValidatingExam,
    isRegistering: state.isRegistering,

    // Errors
    examValidationError: state.examValidationError,
    registrationError: state.registrationError,

    // Methods
    validateExam,
    register,
    updateForm,
    clearAllErrors,
  };
};
