/**
 * Registration Module Types
 * Based on CAP System Registration Flowchart
 */

export interface RegistrationFormData {
  // Exam Details
  examType: 'NEET' | 'MHT-CET';
  examRollNumber: string;
  dateOfBirth: string;

  // Personal Details
  candidateName: string;
  fatherName: string;
  motherName: string;
  gender: 'Male' | 'Female' | 'Other';
  genderConfirm: 'Male' | 'Female' | 'Other';
  dob: string;
  dobConfirm: string;
  religion: string;
  nationality: string;

  // Communication Details
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  pinCode: string;
  stdCode?: string;
  telephoneNo?: string;
  mobileNo: string;
  email: string;

  // Security
  password: string;
  confirmPassword: string;
  captcha: string;

  // Terms
  agreeToTerms: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  applicationId: string;
  message: string;
  mobileNumber: string;
  email: string;
}

export interface OTPVerificationRequest {
  applicationId: string;
  otp: string;
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
  verified: boolean;
}

export interface ResendOTPRequest {
  applicationId: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
  otpSent: boolean;
}

export interface ExamValidationRequest {
  examType: 'NEET' | 'MHT-CET';
  rollNumber: string;
  dateOfBirth: string;
}

export interface ExamValidationResponse {
  valid: boolean;
  candidateName?: string;
  score?: number;
  message?: string;
}

// Redux State
export interface RegistrationState {
  // Form Data
  formData: Partial<RegistrationFormData>;

  // Application Info
  applicationId: string | null;
  mobileNumber: string | null;
  email: string | null;

  // Flow Control
  currentStep: 'form' | 'otp' | 'success';

  // OTP
  otpSent: boolean;
  otpVerified: boolean;
  otpResendCount: number;
  otpResendTimer: number;

  // Loading States
  isValidatingExam: boolean;
  isRegistering: boolean;
  isVerifyingOTP: boolean;
  isResendingOTP: boolean;

  // Errors
  examValidationError: string | null;
  registrationError: string | null;
  otpError: string | null;

  // Success
  registrationSuccess: boolean;
}

// Validation Schemas
export interface PasswordValidation {
  minLength: boolean;
  maxLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

// Master Data
export interface State {
  id: string;
  name: string;
  code: string;
}

export interface District {
  id: string;
  stateId: string;
  name: string;
  code: string;
}

export interface Taluka {
  id: string;
  districtId: string;
  name: string;
  code: string;
}

export interface Village {
  id: string;
  talukaId: string;
  name: string;
  code: string;
}
