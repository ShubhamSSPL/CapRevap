/**
 * OTP Verification Page
 * Verify OTP sent to mobile/email
 */

import React, { useState } from 'react';
import { Card, Alert, Input, Space, Typography } from 'antd';
import { Button } from '@/shared/components/ui/Button';
import { useOTPVerification } from '../hooks/useOTPVerification';
import './OTPVerification.css';

const { Title, Text } = Typography;

export const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState('');

  const {
    applicationId,
    mobileNumber,
    email,
    isVerifyingOTP,
    isResendingOTP,
    otpError,
    otpResendTimer,
    canResend,
    maxAttemptsReached,
    verifyOTP,
    resendOTP,
  } = useOTPVerification();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return;
    }

    const result = await verifyOTP(otp);

    if (result.success) {
      // Navigation handled by hook
      console.log('OTP verified successfully!');
    }
  };

  const handleResend = async () => {
    const result = await resendOTP();

    if (result.success) {
      setOtp(''); // Clear OTP input
    }
  };

  const maskMobile = (mobile: string | null) => {
    if (!mobile) return '**********';
    return `******${mobile.slice(-4)}`;
  };

  const maskEmail = (email: string | null) => {
    if (!email) return '****@****.com';
    const [user, domain] = email.split('@');
    return `${user.slice(0, 2)}****@${domain}`;
  };

  return (
    <div className="otp-container">
      <Card className="otp-card">
        <div className="otp-header">
          <Title level={3}>Verify OTP</Title>
          <Text type="secondary">
            An OTP has been sent to your registered mobile number and email
          </Text>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <Text strong>Mobile:</Text> <Text>{maskMobile(mobileNumber)}</Text>
          </div>
          <div className="info-item">
            <Text strong>Email:</Text> <Text>{maskEmail(email)}</Text>
          </div>
          <div className="info-item">
            <Text strong>Application ID:</Text>{' '}
            <Text className="app-id">{applicationId}</Text>
          </div>
        </div>

        {otpError && (
          <Alert
            message="Verification Failed"
            description={otpError}
            type="error"
            showIcon
            closable
            style={{ marginBottom: 20 }}
          />
        )}

        {maxAttemptsReached && (
          <Alert
            message="Maximum Attempts Reached"
            description="You have exceeded the maximum number of OTP resend attempts. Please try again after some time or contact support."
            type="warning"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <div className="otp-input-section">
          <label className="otp-label">Enter 6-Digit OTP</label>
          <Input
            size="large"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="otp-input"
            disabled={isVerifyingOTP}
            style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
          />
        </div>

        <div className="otp-actions">
          <Button
            variant="primary"
            size="large"
            block
            onClick={handleVerify}
            loading={isVerifyingOTP}
            disabled={otp.length !== 6}
          >
            Verify OTP
          </Button>

          <div className="resend-section">
            {otpResendTimer > 0 ? (
              <Text type="secondary">
                Resend OTP in {otpResendTimer} seconds
              </Text>
            ) : (
              <Button
                variant="default"
                onClick={handleResend}
                loading={isResendingOTP}
                disabled={!canResend || maxAttemptsReached}
              >
                Resend OTP
              </Button>
            )}
          </div>
        </div>

        <div className="otp-footer">
          <Text type="secondary" className="note">
            Note: OTP is valid for 10 minutes. Check your spam folder if you
            don't receive the email.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default OTPVerification;
