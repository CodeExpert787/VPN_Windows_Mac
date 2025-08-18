import { useEffect, useRef } from 'react';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';

export function useTauriResize(target: 'main' | 'settings' = 'main') {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<number | undefined>(undefined);
  const lastSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = (element: HTMLElement) => {
      // Get the exact dimensions of the dashboard parent div
      const rect = element.getBoundingClientRect();
      // Fixed width for the window
      const FIXED_WIDTH = 800;
      let width = FIXED_WIDTH;
      let height = rect.height;
      // For frameless window, we don't need extra padding since there are no decorations
      width = Math.round(width);
      height = Math.round(height);
      // Ensure minimum size
      width = Math.max(400, width); // This will always be FIXED_WIDTH
      height = Math.max(300, height);
      console.log(`[useTauriResize] Raw rect: ${rect.width}x${rect.height}px`);
      console.log(`[useTauriResize] Final size: ${width}x${height}px`);
      return { width, height };
    };

    const applyResize = async (width: number, height: number) => {
      console.log(`[useTauriResize] applyResize called with: ${width}x${height}px`);
      console.log(`[useTauriResize] Last size was: ${lastSizeRef.current.width}x${lastSizeRef.current.height}px`);
      
      // Only resize if size actually changed significantly (more than 5px)
      const sizeDiff = Math.abs(width - lastSizeRef.current.width) + Math.abs(height - lastSizeRef.current.height);
      console.log(`[useTauriResize] Size difference: ${sizeDiff}px`);
      
      if (sizeDiff > 5) {
        const w = Math.max(400, width);
        const h = Math.max(300, height);
        
        console.log(`[useTauriResize] Resizing window to: ${w}x${h}px`);
        
        try {
          const window = getCurrentWindow();
          await window.setSize(new LogicalSize(w, h));
          lastSizeRef.current = { width: w, height: h };
          console.log(`[useTauriResize] Resize successful!`);
        } catch (error) {
          console.error('[useTauriResize] Failed to resize window:', error);
        }
      } else {
        console.log(`[useTauriResize] No resize needed, size change too small: ${sizeDiff}px`);
      }
    };

    // Force initial resize regardless of current size
    const forceInitialResize = async () => {
      console.log(`[useTauriResize] Force initial resize`);
      const initial = measure(el);
      await applyResize(initial.width, initial.height);
    };

    // Initial measurement with a small delay to ensure content is rendered
    setTimeout(() => {
      forceInitialResize();
    }, 200);

    // Also try again after a longer delay to ensure everything is loaded
    setTimeout(() => {
      forceInitialResize();
    }, 1000);

    // Create ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(`[useTauriResize] ResizeObserver triggered:`, entry.contentRect);
        
        // Clear any existing timeout
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        
        // Debounce the resize to avoid too many calls
        resizeTimeoutRef.current = window.setTimeout(() => {
          const { width, height } = measure(el);
          applyResize(width, height);
        }, 50); // Slightly longer debounce for better performance
      }
    });

    // Start observing the element
    resizeObserver.observe(el);

    // Also observe the document for any layout changes
    const mutationObserver = new MutationObserver(() => {
      console.log(`[useTauriResize] MutationObserver triggered`);
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = window.setTimeout(() => {
        const { width, height } = measure(el);
        applyResize(width, height);
      }, 50);
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
