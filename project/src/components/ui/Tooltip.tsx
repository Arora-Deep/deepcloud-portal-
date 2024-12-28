import React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, position = 'top', children, ...props }, ref) => {
    const positionStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
      <div className="relative group" ref={ref} {...props}>
        {children}
        <div
          className={cn(
            'absolute hidden group-hover:block z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap',
            positionStyles[position],
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 bg-gray-900 transform rotate-45',
              position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
              position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
              position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
              position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
            )}
          />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;