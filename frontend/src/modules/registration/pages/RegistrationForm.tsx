/**
 * Registration Form Page
 * Main registration page for new candidates
 */

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, Alert, Space } from 'antd';
import { FormInput } from '@/shared/components/forms/FormInput';
import { FormSelect } from '@/shared/components/forms/FormSelect';
import { Button } from '@/shared/components/ui/Button';
import { useRegistration } from '../hooks/useRegistration';
import type { RegistrationFormData } from '../types/registration.types';
import './RegistrationForm.css';

// Validation Schema
const registrationSchema = yup.object().shape({
  // Exam Details
  examType: yup.string().required('Exam type is required'),
  examRollNumber: yup.string().required('Roll number is required'),

  // Personal Details
  candidateName: yup.string().required('Candidate name is required'),
  fatherName: yup.string().required('Father name is required'),
  motherName: yup.string().required('Mother name is required'),
  gender: yup.string().required('Gender is required'),
  genderConfirm: yup
    .string()
    .oneOf([yup.ref('gender')], 'Gender must match')
    .required('Please confirm gender'),
  dob: yup.string().required('Date of birth is required'),
  dobConfirm: yup
    .string()
    .oneOf([yup.ref('dob')], 'Date of birth must match')
    .required('Please confirm date of birth'),

  // Communication Details
  mobileNo: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  addressLine1: yup.string().required('Address is required'),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'PIN code must be 6 digits')
    .required('PIN code is required'),

  // Password
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(13, 'Password must not exceed 13 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm password'),

  // Terms
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to terms and conditions'),
});

export const RegistrationForm: React.FC = () => {
  const [examValidated, setExamValidated] = useState(false);

  const {
    validateExam,
    register: registerCandidate,
    isValidatingExam,
    isRegistering,
    examValidationError,
    registrationError,
  } = useRegistration();

  const methods = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const examType = watch('examType');
  const examRollNumber = watch('examRollNumber');
  const dob = watch('dob');

  // Validate Exam
  const handleValidateExam = async () => {
    if (!examType || !examRollNumber || !dob) {
      return;
    }

    const result = await validateExam({
      examType: examType as 'NEET' | 'MHT-CET',
      rollNumber: examRollNumber,
      dateOfBirth: dob,
    });

    if (result.success) {
      setExamValidated(true);
      if (result.candidateName) {
        methods.setValue('candidateName', result.candidateName);
      }
    }
  };

  // Submit Registration
  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerCandidate(data);

    if (result.success) {
      // Navigation handled by hook
      console.log('Registration successful!', result.applicationId);
    }
  };

  return (
    <div className="registration-container">
      <Card title="New Candidate Registration" className="registration-card">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Exam Validation Section */}
            <section className="form-section">
              <h3>Exam Details</h3>

              {examValidationError && (
                <Alert
                  message="Exam Validation Failed"
                  description={examValidationError}
                  type="error"
                  showIcon
                  closable
                  style={{ marginBottom: 16 }}
                />
              )}

              <FormSelect
                name="examType"
                label="Entrance Exam"
                required
                options={[
                  { value: 'NEET', label: 'NEET' },
                  { value: 'MHT-CET', label: 'MHT-CET' },
                ]}
                placeholder="Select exam"
              />

              <FormInput
                name="examRollNumber"
                label="Roll Number"
                required
                placeholder="Enter your roll number"
              />

              <FormInput
                name="dob"
                label="Date of Birth"
                type="text"
                required
                placeholder="DD/MM/YYYY"
                helpText="As per your exam scorecard"
              />

              <Button
                variant="primary"
                onClick={handleValidateExam}
                loading={isValidatingExam}
                disabled={examValidated}
              >
                {examValidated ? 'Exam Validated ✓' : 'Validate Exam Details'}
              </Button>
            </section>

            {examValidated && (
              <>
                {/* Personal Details */}
                <section className="form-section">
                  <h3>Personal Details</h3>

                  <FormInput
                    name="candidateName"
                    label="Candidate's Full Name"
                    required
                    placeholder="As per HSC marksheet"
                  />

                  <FormInput
                    name="fatherName"
                    label="Father's Name"
                    required
                  />

                  <FormInput
                    name="motherName"
                    label="Mother's Name"
                    required
                  />

                  <FormSelect
                    name="gender"
                    label="Gender"
                    required
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />

                  <FormSelect
                    name="genderConfirm"
                    label="Confirm Gender"
                    required
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />

                  <FormInput
                    name="dobConfirm"
                    label="Confirm Date of Birth"
                    type="text"
                    required
                    placeholder="DD/MM/YYYY"
                  />
                </section>

                {/* Communication Details */}
                <section className="form-section">
                  <h3>Communication Details</h3>

                  <FormInput
                    name="addressLine1"
                    label="Address Line 1"
                    required
                  />

                  <FormInput
                    name="addressLine2"
                    label="Address Line 2"
                  />

                  <FormInput
                    name="pinCode"
                    label="PIN Code"
                    required
                    maxLength={6}
                  />

                  <FormInput
                    name="mobileNo"
                    label="Mobile Number"
                    type="tel"
                    required
                    maxLength={10}
                    helpText="OTP will be sent to this number"
                  />

                  <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    required
                    helpText="OTP will also be sent to this email"
                  />
                </section>

                {/* Password */}
                <section className="form-section">
                  <h3>Create Password</h3>

                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    required
                    helpText="8-13 characters with uppercase, lowercase, number and special character"
                  />

                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                  />
                </section>

                {/* Submit */}
                {registrationError && (
                  <Alert
                    message="Registration Failed"
                    description={registrationError}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                  />
                )}

                <Space>
                  <Button
                    variant="primary"
                    htmlType="submit"
                    loading={isRegistering}
                    size="large"
                  >
                    Register & Send OTP
                  </Button>

                  <Button
                    variant="default"
                    onClick={() => methods.reset()}
                    disabled={isRegistering}
                  >
                    Reset Form
                  </Button>
                </Space>
              </>
            )}
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default RegistrationForm;
