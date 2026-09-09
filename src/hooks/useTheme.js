import { useThemeStore } from '../store/useThemeStore';

export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const setting = useThemeStore((s) => s.setting);
  const setSetting = useThemeStore((s) => s.setSetting);
  const toggle = useThemeStore((s) => s.toggle);

  return { mode, setting, setSetting, toggle };
}
