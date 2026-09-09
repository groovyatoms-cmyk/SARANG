import { create } from 'zustand';
import { getItem, setItem } from '../utils/storage';

const getSystemPrefersDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolveMode = (setting) => (setting === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : setting);

const initialSetting = getItem('themeSetting', 'dark');

export const useThemeStore = create((set, get) => ({
  setting: initialSetting, // 'dark' | 'light' | 'system'
  mode: resolveMode(initialSetting),
  setSetting: (setting) => {
    setItem('themeSetting', setting);
    set({ setting, mode: resolveMode(setting) });
  },
  toggle: () => {
    const next = get().mode === 'dark' ? 'light' : 'dark';
    get().setSetting(next);
  },
}));

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { setting, setSetting } = useThemeStore.getState();
    if (setting === 'system') setSetting('system');
  });
}
