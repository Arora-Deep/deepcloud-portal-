import React from 'react';
import { X } from 'lucide-react';

interface ConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'vps' | 'daas';
  ip: string;
}

const ConsoleModal: React.FC<ConsoleModalProps> = ({ isOpen, onClose, title, type, ip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-6 min-h-[400px] bg-gray-900 rounded-b-xl">
          {type === 'vps' ? (
            <div className="font-mono text-green-400 text-sm">
              <p>Connecting to {ip}...</p>
              <p className="mt-2">SSH session established</p>
              <p className="mt-2 animate-pulse">root@{ip}:~# <span className="ml-1">|</span></p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Launching remote desktop session...</p>
                <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsoleModal;