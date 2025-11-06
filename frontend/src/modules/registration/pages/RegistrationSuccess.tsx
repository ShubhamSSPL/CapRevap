/**
 * Registration Success Page
 * Display success message and application ID
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Result, Typography, Space, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from '@/shared/components/ui/Button';
import { RootState } from '@/shared/store/store';
import './RegistrationSuccess.css';

const { Title, Text, Paragraph } = Typography;

export const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const { applicationId, mobileNumber, email } = useSelector(
    (state: RootState) => state.registration
  );

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handlePrintPage = () => {
    window.print();
  };

  return (
    <div className="success-container">
      <Card className="success-card">
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          status="success"
          title="Registration Successful!"
          subTitle="Your application has been registered successfully. Please save your Application ID for future reference."
        />

        <div className="application-details">
          <div className="detail-item highlight">
            <Text strong>Application ID:</Text>
            <Title level={3} className="app-id">
              {applicationId || 'APP-XXXXXX'}
            </Title>
          </div>

          <Divider />

          <div className="detail-item">
            <Text strong>Registered Mobile:</Text>
            <Text>{mobileNumber}</Text>
          </div>

          <div className="detail-item">
            <Text strong>Registered Email:</Text>
            <Text>{email}</Text>
          </div>
        </div>

        <div className="instructions">
          <Title level={4}>Important Instructions</Title>

          <Paragraph>
            <ul>
              <li>
                Your Application ID and password will be required to login to the
                system.
              </li>
              <li>
                A confirmation email has been sent to your registered email
                address.
              </li>
              <li>
                A confirmation SMS has been sent to your registered mobile
                number.
              </li>
              <li>
                Please keep your Application ID safe. You will need it for all
                future communications.
              </li>
              <li>
                You can now login and complete your application form (10 steps).
              </li>
              <li>
                Make sure to complete your application before the deadline.
              </li>
            </ul>
          </Paragraph>
        </div>

        <div className="next-steps">
          <Title level={4}>Next Steps</Title>
          <Paragraph>
            <ol>
              <li>Login using your Application ID and password</li>
              <li>Complete the 10-step application form</li>
              <li>Upload required documents</li>
              <li>Pay the application fee</li>
              <li>Submit your application for verification</li>
            </ol>
          </Paragraph>
        </div>

        <div className="action-buttons">
          <Space size="middle">
            <Button
              variant="primary"
              size="large"
              onClick={handleGoToLogin}
            >
              Proceed to Login
            </Button>

            <Button variant="default" size="large" onClick={handlePrintPage}>
              Print This Page
            </Button>
          </Space>
        </div>

        <div className="support-info">
          <Text type="secondary">
            For any queries, please contact: <br />
            <strong>Technical Helpline:</strong> +91-9175108612, 18002660160{' '}
            <br />
            <strong>Email:</strong> cetcell.technicaledu@gmail.com <br />
            <strong>Timing:</strong> 10:00 AM to 06:00 PM
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
