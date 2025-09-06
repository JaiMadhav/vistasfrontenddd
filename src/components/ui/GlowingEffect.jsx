import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';

const GlowingEffect = ({
  children,
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = 'default',
  glow = false,
  className,
  disabled = false,
  movementDuration = 2,
  borderWidth = 1,
  ...props
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (disabled || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });
  }, [disabled]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 }); // Reset position when leaving
  }, [disabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && !disabled) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container && !disabled) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, disabled]);

  const gradientColors = {
    default: 'linear-gradient(to right, #8B5CF6, #EC4899, #EF4444, #F59E0B, #10B981, #3B82F6)',
    white: 'linear-gradient(to right, #E2E8F0, #CBD5E1, #94A3B8, #64748B, #475569, #1E293B)',
  };

  const glowStyle = {
    '--x': `${mousePosition.x}px`,
    '--y': `${mousePosition.y}px`,
    '--blur': `${blur}px`,
    '--inactive-zone': `${inactiveZone}`,
    '--proximity': `${proximity}px`,
    '--spread': `${spread}deg`,
    '--gradient': gradientColors[variant],
    '--movement-duration': `${movementDuration}s`,
    '--border-width': `${borderWidth}px`,
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative isolate overflow-hidden rounded-xl',
        'before:absolute before:inset-0 before:z-[-1] before:rounded-xl',
        'before:bg-gradient-to-br before:from-gray-900 before:to-black', // Base background for dark theme
        'after:absolute after:inset-0 after:z-[-1] after:rounded-xl',
        'after:opacity-0 after:transition-opacity after:duration-300',
        (isHovered || glow) && !disabled && 'after:opacity-100',
        'after:[background:var(--gradient)]',
        'after:[mask-image:radial-gradient(circle_at_var(--x)_var(--y),transparent_calc(var(--proximity)_*_var(--inactive-zone)),black_calc(var(--proximity)_*_var(--inactive-zone)_+_var(--border-width)))]',
        'after:[mask-composite:exclude]',
        'after:[filter:blur(var(--blur))]',
        'after:[animation:glow-movement_var(--movement-duration)_infinite_linear]',
        className
      )}
      style={glowStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlowingEffect;