import { useEffect, useRef } from "react";

/**
 * Custom hook that debounces a value and executes a callback when it changes
 * @param value - The value to watch for changes
 * @param callback - The function to execute when the debounced value changes
 * @param delay - The delay in milliseconds
 */
export function useDebounce<T>(
  value: T,
  callback: (debouncedValue: T) => void,
  delay: number
): void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up a timer to execute the callback after the delay
    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);

    // Clean up the timer if value changes before the delay is complete
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, callback, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
