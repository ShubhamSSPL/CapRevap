/**
 * Registration Service
 * Handles all API calls for registration module
 */

import { apiService } from '@/shared/services/api/base.service';
import {
  RegistrationFormData,
  RegistrationResponse,
  OTPVerificationRequest,
  OTPVerificationResponse,
  ResendOTPRequest,
  ResendOTPResponse,
  ExamValidationRequest,
  ExamValidationResponse,
} from '../types/registration.types';

export class RegistrationService {
  /**
   * Validate exam details (NEET/MHT-CET)
   */
  static async validateExam(
    data: ExamValidationRequest
  ): Promise<ExamValidationResponse> {
    return apiService.post<ExamValidationResponse>(
      '/api/registration/validate-exam',
      data
    );
  }

  /**
   * Register new candidate
   */
  static async register(
    data: RegistrationFormData
  ): Promise<RegistrationResponse> {
    return apiService.post<RegistrationResponse>(
      '/api/registration/register',
      data
    );
  }

  /**
   * Verify OTP sent to mobile/email
   */
  static async verifyOTP(
    data: OTPVerificationRequest
  ): Promise<OTPVerificationResponse> {
    return apiService.post<OTPVerificationResponse>(
      '/api/registration/verify-otp',
      data
    );
  }

  /**
   * Resend OTP
   */
  static async resendOTP(
    data: ResendOTPRequest
  ): Promise<ResendOTPResponse> {
    return apiService.post<ResendOTPResponse>(
      '/api/registration/resend-otp',
      data
    );
  }

  /**
   * Check if mobile number already registered
   */
  static async checkDuplicate(mobileNo: string): Promise<boolean> {
    const response = await apiService.get<{ exists: boolean }>(
      `/api/registration/check-duplicate?mobile=${mobileNo}`
    );
    return response.exists;
  }

  /**
   * Check if email already registered
   */
  static async checkEmailDuplicate(email: string): Promise<boolean> {
    const response = await apiService.get<{ exists: boolean }>(
      `/api/registration/check-duplicate?email=${email}`
    );
    return response.exists;
  }
}
