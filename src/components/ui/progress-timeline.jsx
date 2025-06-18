import React from 'react';
import { cn } from '@/lib/utils';

const ProgressTimeline = ({ steps = [], current = 0, className }) => {
  return (
    <ol className={cn('flex items-center space-x-2 rtl:space-x-reverse', className)} dir="ltr">
      {steps.map((step, index) => (
        <li key={index} className="flex-1 flex items-center">
          <div className="flex items-center w-full">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                index <= current ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </span>
            <span className="ml-2 text-sm whitespace-nowrap">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 mx-2" />
          )}
        </li>
      ))}
    </ol>
  );
};

export default ProgressTimeline;
