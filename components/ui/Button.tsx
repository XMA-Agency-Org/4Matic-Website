import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Base button properties
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Button as a regular button element
type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false;
  href?: never;
};

// Button as an anchor link element
type ButtonAsLinkProps = BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  asLink: true;
  href: string;
};

// Combined button props type
type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      asLink,
      href,
      ...props
    },
    ref
  ) => {
    // Base styles for all button variants
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      'disabled:opacity-60 disabled:pointer-events-none',
      {
        'w-full': fullWidth,
        'opacity-60 pointer-events-none': isLoading || isDisabled,
      }
    );

    // Size variations
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
      outline: 'border bg-gray-800 border-gray-700 text-secondary-100 hover:bg-gray-700',
      ghost: 'text-gray-300 hover:bg-gray-100 hover:text-gray-900',
      link: 'text-primary-600 hover:text-primary-700 hover:underline p-0 bg-transparent',
    };

    const buttonStyles = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    // Content to be displayed inside the button
    const content = (
      <>
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="mr-2 inline-flex">{icon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="ml-2 inline-flex">{icon}</span>
        )}
      </>
    );

    // Render as link or button based on props
    if (asLink && href) {
      return (
        <a
          className={buttonStyles}
          href={href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={buttonStyles}
        disabled={isDisabled || isLoading}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { type ButtonProps, type BaseButtonProps };
export default Button;
