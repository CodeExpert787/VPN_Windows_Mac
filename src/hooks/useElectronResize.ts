import { useEffect, useRef } from 'react';

export function useElectronResize(target: 'main' | 'settings' = 'main') {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<number | undefined>(undefined);
  const lastSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.electronAPI) {
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const measure = (element: HTMLElement) => {
      // Get the exact dimensions of the dashboard parent div
      const rect = element.getBoundingClientRect();
      
      // For dashboard, we want the exact height of the container
      let width = rect.width;
      let height = rect.height;

      // Round to nearest pixel for precise sizing
      width = Math.round(width);
      height = Math.round(height);

      console.log(`[useElectronResize] Measured: ${width}x${height}px`);
      return { width, height };
    };

    const applyResize = (width: number, height: number) => {
      // Only resize if size actually changed
      if (width !== lastSizeRef.current.width || height !== lastSizeRef.current.height) {
        const w = Math.max(1, width);
        const h = Math.max(1, height);
        
        console.log(`[useElectronResize] Resizing window to: ${w}x${h}px`);
        
        if (target === 'settings') {
          window.electronAPI.resizeSettingsWindow(w, h);
        } else {
          window.electronAPI.resizeMainWindow(w, h);
        }
        
        lastSizeRef.current = { width: w, height: h };
      } else {
        console.log(`[useElectronResize] No resize needed, size unchanged`);
      }
    };

    // Initial measurement
    const initial = measure(el);
    applyResize(initial.width, initial.height);

    // Create ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(`[useElectronResize] ResizeObserver triggered:`, entry.contentRect);
        
        // Clear any existing timeout
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        
        // Debounce the resize to avoid too many calls
        resizeTimeoutRef.current = window.setTimeout(() => {
          const { width, height } = measure(el);
          applyResize(width, height);
        }, 30); // Reduced debounce time for faster response
      }
    });

    // Start observing the element
    resizeObserver.observe(el);

    // Also observe the document for any layout changes
    const mutationObserver = new MutationObserver(() => {
      console.log(`[useElectronResize] MutationObserver triggered`);
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = window.setTimeout(() => {
        const { width, height } = measure(el);
        applyResize(width, height);
      }, 30);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [target]);

  return containerRef;
}
