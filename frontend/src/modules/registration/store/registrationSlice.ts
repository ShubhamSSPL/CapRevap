/**
 * Registration Redux Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RegistrationState,
  RegistrationFormData,
} from '../types/registration.types';

const initialState: RegistrationState = {
  // Form Data
  formData: {},

  // Application Info
  applicationId: null,
  mobileNumber: null,
  email: null,

  // Flow Control
  currentStep: 'form',

  // OTP
  otpSent: false,
  otpVerified: false,
  otpResendCount: 0,
  otpResendTimer: 0,

  // Loading States
  isValidatingExam: false,
  isRegistering: false,
  isVerifyingOTP: false,
  isResendingOTP: false,

  // Errors
  examValidationError: null,
  registrationError: null,
  otpError: null,

  // Success
  registrationSuccess: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    // Form Data
    updateFormData: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetFormData: (state) => {
      state.formData = {};
    },

    // Application Info
    setApplicationId: (state, action: PayloadAction<string>) => {
      state.applicationId = action.payload;
    },

    setContactInfo: (
      state,
      action: PayloadAction<{ mobile: string; email: string }>
    ) => {
      state.mobileNumber = action.payload.mobile;
      state.email = action.payload.email;
    },

    // Steps
    setCurrentStep: (
      state,
      action: PayloadAction<'form' | 'otp' | 'success'>
    ) => {
      state.currentStep = action.payload;
    },

    goToOTPStep: (state) => {
      state.currentStep = 'otp';
      state.otpSent = true;
    },

    goToSuccessStep: (state) => {
      state.currentStep = 'success';
      state.otpVerified = true;
      state.registrationSuccess = true;
    },

    // Exam Validation
    startExamValidation: (state) => {
      state.isValidatingExam = true;
      state.examValidationError = null;
    },

    examValidationSuccess: (state, action: PayloadAction<{ candidateName: string }>) => {
      state.isValidatingExam = false;
      state.examValidationError = null;
      state.formData.candidateName = action.payload.candidateName;
    },

    examValidationFailed: (state, action: PayloadAction<string>) => {
      state.isValidatingExam = false;
      state.examValidationError = action.payload;
    },

    // Registration
    startRegistration: (state) => {
      state.isRegistering = true;
      state.registrationError = null;
    },

    registrationSuccess: (
      state,
      action: PayloadAction<{
        applicationId: string;
        mobile: string;
        email: string;
      }>
    ) => {
      state.isRegistering = false;
      state.registrationError = null;
      state.applicationId = action.payload.applicationId;
      state.mobileNumber = action.payload.mobile;
      state.email = action.payload.email;
    },

    registrationFailed: (state, action: PayloadAction<string>) => {
      state.isRegistering = false;
      state.registrationError = action.payload;
    },

    // OTP Verification
    startOTPVerification: (state) => {
      state.isVerifyingOTP = true;
      state.otpError = null;
    },

    otpVerificationSuccess: (state) => {
      state.isVerifyingOTP = false;
      state.otpVerified = true;
      state.otpError = null;
    },

    otpVerificationFailed: (state, action: PayloadAction<string>) => {
      state.isVerifyingOTP = false;
      state.otpError = action.payload;
    },

    // Resend OTP
    startResendOTP: (state) => {
      state.isResendingOTP = true;
      state.otpError = null;
    },

    resendOTPSuccess: (state) => {
      state.isResendingOTP = false;
      state.otpResendCount += 1;
      state.otpResendTimer = 60; // 60 seconds cooldown
      state.otpError = null;
    },

    resendOTPFailed: (state, action: PayloadAction<string>) => {
      state.isResendingOTP = false;
      state.otpError = action.payload;
    },

    decrementResendTimer: (state) => {
      if (state.otpResendTimer > 0) {
        state.otpResendTimer -= 1;
      }
    },

    // Reset
    resetRegistration: () => initialState,

    clearErrors: (state) => {
      state.examValidationError = null;
      state.registrationError = null;
      state.otpError = null;
    },
  },
});

export const {
  updateFormData,
  resetFormData,
  setApplicationId,
  setContactInfo,
  setCurrentStep,
  goToOTPStep,
  goToSuccessStep,
  startExamValidation,
  examValidationSuccess,
  examValidationFailed,
  startRegistration,
  registrationSuccess,
  registrationFailed,
  startOTPVerification,
  otpVerificationSuccess,
  otpVerificationFailed,
  startResendOTP,
  resendOTPSuccess,
  resendOTPFailed,
  decrementResendTimer,
  resetRegistration,
  clearErrors,
} = registrationSlice.actions;

export default registrationSlice.reducer;
