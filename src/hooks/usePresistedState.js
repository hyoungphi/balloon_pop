import { useState, useEffect } from 'react';


export function usePresitestedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    if (persistedValue === null) {
      return defaultValue;
    }
    if (persistedValue === 'undefined') {
      return defaultValue;
    }
    return JSON.parse(persistedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}