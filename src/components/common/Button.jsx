import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
    >
      {Icon && <Icon className="btn-icon" size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children && <span>{children}</span>}
    </button>
  );
};
