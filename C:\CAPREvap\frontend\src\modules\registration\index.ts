/**
 * Registration Module - Barrel Export
 * Export all public APIs from the registration module
 */

// Routes
export { registrationRoutes } from './routes';

// Types
export type {
  RegistrationFormData,
  RegistrationResponse,
  OTPVerificationRequest,
  OTPVerificationResponse,
  ResendOTPRequest,
  ResendOTPResponse,
  ExamValidationRequest,
  ExamValidationResponse,
  RegistrationState,
  State,
  District,
  Taluka,
  Village,
} from './types/registration.types';

// Hooks
export { useRegistration } from './hooks/useRegistration';
export { useOTPVerification } from './hooks/useOTPVerification';

// Services
export { RegistrationService } from './services/registration.service';

// Redux Actions
export {
  updateFormData,
  resetFormData,
  setApplicationId,
  setContactInfo,
  setCurrentStep,
  goToOTPStep,
  goToSuccessStep,
  resetRegistration,
  clearErrors,
} from './store/registrationSlice';
