import React, { useEffect } from 'react';

const AlertNotification = ({ alertMessage, onDismiss }) => {
  useEffect(() => {
    // Auto dismiss the alert after 5 seconds
    const timer = setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [onDismiss]);

  return (
    alertMessage && (
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-md mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 011.414 1.414L12 13.414l6.293 6.293a1 1 0 01-1.414 1.414L12 16.586l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
          />
        </svg>
        <p className="flex-1">{alertMessage}</p>
        <button
          onClick={onDismiss}
          className="ml-4 text-white hover:text-red-200 focus:outline-none"
          aria-label="Dismiss Alert"
        >
          &times; {/* Close icon */}
        </button>
      </div>
    )
  );
};

export default AlertNotification;
