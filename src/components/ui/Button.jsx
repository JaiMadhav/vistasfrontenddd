import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false,
  ...props 
}, ref) => {
  const Comp = "button";
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    gradient: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
    modern: "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
});

Button.displayName = "Button";

export { Button };
