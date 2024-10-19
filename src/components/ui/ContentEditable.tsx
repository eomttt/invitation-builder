import { cn } from 'lib/utils';
import * as React from 'react';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLDivElement>;

const ContentEditable = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        contentEditable
        className={cn(
          'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ContentEditable.displayName = 'ContentEditable';

export { ContentEditable };
