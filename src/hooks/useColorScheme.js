import { useEffect, useState } from 'react';
import { usePresitestedState } from 'hooks/usePresistedState';


export function useColorScheme() {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [colorScheme, setColorScheme] = usePresitestedState('colorScheme', systemPrefersDark ? 'dark' : 'light');
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      setColorScheme('dark');
    } else {
      document.body.classList.remove('dark');
      setColorScheme('light');
    }
  }, [isDark, setColorScheme]);

  return [isDark, setIsDark];
}