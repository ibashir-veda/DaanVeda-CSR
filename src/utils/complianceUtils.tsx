import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'compliant':
      return <CheckCircle className="text-green-500" />;
    case 'partial':
      return <AlertTriangle className="text-yellow-500" />;
    case 'non-compliant':
      return <AlertTriangle className="text-red-500" />;
    default:
      return <HelpCircle className="text-gray-500" />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant':
      return 'bg-green-100 text-green-800';
    case 'partial':
      return 'bg-yellow-100 text-yellow-800';
    case 'non-compliant':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};