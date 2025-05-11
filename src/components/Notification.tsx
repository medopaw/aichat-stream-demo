import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full ${bgColor} border ${borderColor} rounded-lg shadow-sm`}>
      <div className="p-4 flex items-start">
        <Icon className={`${textColor} w-5 h-5 mt-0.5`} />
        <div className={`ml-3 ${textColor} flex-1`}>{message}</div>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:opacity-75 transition-opacity`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;