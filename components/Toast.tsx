
import React, { useEffect } from 'react';
import { ToastState } from '../types';

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, onClose]);

  const baseClasses = "fixed bottom-8 right-8 text-white py-4 px-6 rounded-xl shadow-lg z-[100] font-semibold transition-all duration-300 transform";
  
  const typeClasses = {
    success: 'bg-gradient-to-br from-emerald-500 to-green-600',
    error: 'bg-gradient-to-br from-red-500 to-rose-600',
    info: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  };

  const visibilityClasses = toast.isVisible
    ? 'opacity-100 translate-x-0'
    : 'opacity-0 translate-x-full';

  return (
    <div className={`${baseClasses} ${typeClasses[toast.type]} ${visibilityClasses}`}>
      {toast.message}
    </div>
  );
};

export default Toast;