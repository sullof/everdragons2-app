import React from 'react';

const LoadingSpinner = ({ size = 'small', className = '' }) => {
  const sizeClasses = {
    small: 'loading-logo-small',
    medium: 'loading-logo',
    large: 'loading-logo-large'
  };

  return (
    <img
      src="/images/spinner.svg"
      alt="Loading..."
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export default LoadingSpinner; 