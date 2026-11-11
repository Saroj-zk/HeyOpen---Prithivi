import * as React from 'react';

/**
 * Theme hook for the sections in this folder.
 *
 * In the site these came from, the equivalent context always answered
 * `{ isDark: false }`: one palette, no switch, nothing that can repaint
 * after the first frame. The sections still branch on `isDark` in a few
 * places, so the hook stays rather than the branches being deleted — if
 * the host app has a dark mode, point this at its own theme hook and the
 * dark values come to life.
 *
 * Drop-in replacement, if the host already has one:
 *
 *   export { useThemeMode } from 'wherever/your/ThemeContext';
 */
const VALUE = { isDark: false };

export const ThemeContext = React.createContext(VALUE);

export function useThemeMode() {
  return React.useContext(ThemeContext);
}
