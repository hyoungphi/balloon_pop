import Switch from 'react-switch';
import { useColorScheme } from 'hooks/useColorScheme';


function ColorSchemeSwitch() {
  const [isDark, setIsDark] = useColorScheme();
  return (
    <Switch
      checked={isDark}
      onChange={(e) => setIsDark(e)}
      checkedHandleIcon={<div>🌙</div>}
      uncheckedHandleIcon={<div>🌞</div>}
    />
  );
}

export default ColorSchemeSwitch;