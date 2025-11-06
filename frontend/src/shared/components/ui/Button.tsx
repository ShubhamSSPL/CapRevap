/**
 * Button Component
 */

import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';

interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'default';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  const getType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'danger':
        return 'primary';
      case 'secondary':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <AntButton
      type={getType()}
      danger={variant === 'danger'}
      {...props}
    >
      {children}
    </AntButton>
  );
};
