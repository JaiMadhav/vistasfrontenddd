import { useEffect } from 'react';

export const useZoomResponsive = () => {
  useEffect(() => {
    const handleZoom = () => {
      // Get the current zoom level
      const zoom = window.devicePixelRatio || 1;
      
      // Update CSS custom properties for zoom level
      document.documentElement.style.setProperty('--zoom-level', zoom);
      
      // Ensure body doesn't overflow
      document.body.style.maxWidth = '100vw';
      document.body.style.overflowX = 'hidden';
      
      // Fix any elements that might overflow
      const containers = document.querySelectorAll('.max-w-7xl, .max-w-6xl, .max-w-5xl, .container-custom');
      containers.forEach(container => {
        container.style.maxWidth = 'min(100vw, 100%)';
        container.style.overflowX = 'hidden';
      });
    };

    // Handle zoom changes
    const handleResize = () => {
      handleZoom();
    };

    // Initial setup
    handleZoom();

    // Listen for zoom and resize events
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver to detect zoom changes
    const resizeObserver = new ResizeObserver(() => {
      handleZoom();
    });
    
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);
};
