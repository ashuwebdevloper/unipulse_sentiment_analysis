# Theme System Documentation

## Overview

UniPulse AI now supports both light and dark themes with smooth transitions and persistent user preferences.

## Features

### ✅ Implemented
- **Light and Dark Themes**: Complete color palettes for both themes
- **Theme Persistence**: User's theme preference is saved in localStorage
- **System Preference Detection**: Automatically detects user's system theme preference
- **Smooth Transitions**: Animated theme switching for better UX
- **Theme Toggle Button**: Easy-to-use toggle in the navbar
- **CSS Variables**: All colors use CSS variables for easy theming
- **Responsive Design**: Both themes work seamlessly across all screen sizes

## Architecture

### Theme Context (`contexts/ThemeContext.jsx`)

The theme system uses React Context for state management:

```javascript
const { theme, toggleTheme } = useTheme();
```

**Features:**
- Provides `theme` state ("dark" or "light")
- Provides `toggleTheme` function to switch themes
- Automatically saves theme preference to localStorage
- Syncs with HTML `data-theme` attribute

### Theme Toggle Component (`components/ThemeToggle.jsx`)

A reusable button component for switching themes:

```javascript
<ThemeToggle />
```

**Features:**
- Displays sun emoji for light theme
- Displays moon emoji for dark theme
- Smooth hover effects
- Accessible with title attribute

## Color System

### CSS Variables

All colors are defined as CSS variables for easy theming:

#### Dark Theme (`[data-theme="dark"]`)
```css
--bg-primary: #0d1117;
--bg-secondary: #161b22;
--bg-tertiary: #21262d;
--bg-hover: #30363d;

--text-primary: #c9d1d9;
--text-secondary: #8b949e;
--text-muted: #484f58;

--border-primary: #30363d;
--border-secondary: #21262d;

--accent-primary: #58a6ff;
--accent-success: #10b981;
--accent-warning: #f59e0b;
--accent-danger: #ef4444;
```

#### Light Theme (`[data-theme="light"]`)
```css
--bg-primary: #ffffff;
--bg-secondary: #f6f8fa;
--bg-tertiary: #eaeef2;
--bg-hover: #f3f4f6;

--text-primary: #24292f;
--text-secondary: #57606a;
--text-muted: #8c959f;

--border-primary: #d0d7de;
--border-secondary: #eaeef2;

--accent-primary: #0969da;
--accent-success: #1a7f37;
--accent-warning: #9a6700;
--accent-danger: #cf222e;
```

### Color Categories

**Background Colors**
- `--bg-primary`: Main page background
- `--bg-secondary`: Card and component backgrounds
- `--bg-tertiary`: Input and hover backgrounds
- `--bg-hover`: Hover state backgrounds

**Text Colors**
- `--text-primary`: Main text color
- `--text-secondary`: Secondary text and labels
- `--text-muted`: Muted and disabled text

**Border Colors**
- `--border-primary`: Primary borders
- `--border-secondary`: Secondary borders

**Accent Colors**
- `--accent-primary`: Primary action color
- `--accent-success`: Success states
- `--accent-warning`: Warning states
- `--accent-danger`: Error states
- `--accent-purple`: Purple accent
- `--accent-pink`: Pink accent
- `--accent-cyan`: Cyan accent
- `--accent-teal`: Teal accent
- `--accent-indigo`: Indigo accent
- `--accent-rose`: Rose accent

## Usage

### Adding Theme Support to Components

All components should use CSS variables instead of hardcoded colors:

```javascript
// ❌ Bad - Hardcoded colors
<div style={{ background: "#161b22", color: "#c9d1d9" }}>

// ✅ Good - CSS variables
<div style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}>
```

### Using Theme Context

```javascript
import { useTheme } from "../contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Theme-Aware Styles

```javascript
const style = {
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  border: `1px solid var(--border-primary)`,
  transition: "all var(--transition-base), background-color var(--transition-base)",
};
```

## Transitions

Smooth transitions are applied to theme-related properties:

```css
transition: background-color var(--transition-base), 
            color var(--transition-base), 
            border-color var(--transition-base);
```

**Transition Durations:**
- `--transition-fast`: 150ms
- `--transition-base`: 200ms
- `--transition-slow`: 300ms

## Initialization

Theme is initialized in `main.jsx` before React renders:

```javascript
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", initialTheme);
```

This prevents flash of incorrect theme on page load.

## Browser Support

The theme system works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

### Color Contrast

Both themes meet WCAG AA standards for color contrast:
- Normal text: 4.5:1 ratio
- Large text: 3:1 ratio
- UI components: 3:1 ratio

### System Preference

Respects user's system preference:
- Automatically detects `prefers-color-scheme`
- Falls back to system preference if no saved preference
- Allows manual override

### Keyboard Navigation

Theme toggle is keyboard accessible:
- Tab navigable
- Enter/Space to activate
- Clear focus indicators

## Performance

### Optimizations

- **CSS Variables**: No JavaScript overhead for color changes
- **GPU Accelerated**: Transitions use GPU where possible
- **Minimal Repaints**: Only affected elements repaint
- **LocalStorage**: Fast preference persistence

### Best Practices

1. Use CSS variables for all theme-related colors
2. Add transitions to theme-aware elements
3. Avoid inline styles for theme properties
4. Test both themes during development

## Customization

### Adding New Colors

Add new colors to both theme definitions:

```css
[data-theme="dark"] {
  --my-color: #hex-value;
}

[data-theme="light"] {
  --my-color: #hex-value;
}
```

### Custom Themes

To add custom themes:

1. Add new theme definition in `index.css`
2. Update `ThemeContext` to support new theme
3. Update `ThemeToggle` to handle new theme

## Testing

### Manual Testing Checklist

- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Theme toggle works
- [ ] Theme persists on page refresh
- [ ] System preference is detected
- [ ] Transitions are smooth
- [ ] All components use CSS variables
- [ ] Color contrast is sufficient
- [ ] Works on mobile devices
- [ ] Works in all supported browsers

### Automated Testing

```javascript
describe('Theme System', () => {
  test('toggles theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
  });
  
  test('persists theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
```

## Troubleshooting

### Theme Not Applying

**Problem**: Theme doesn't change when toggled

**Solutions**:
1. Check if `data-theme` attribute is set on `<html>`
2. Verify CSS variables are defined for both themes
3. Ensure components use CSS variables
4. Check browser console for errors

### Flash of Wrong Theme

**Problem**: Wrong theme shows briefly on page load

**Solutions**:
1. Ensure theme is initialized in `main.jsx`
2. Check if localStorage is being read correctly
3. Verify system preference detection works

### Transitions Not Smooth

**Problem**: Theme switching is jerky

**Solutions**:
1. Add transitions to affected elements
2. Use `transition` property with theme variables
3. Avoid expensive animations during theme switch

## Future Enhancements

### Planned Features
- [ ] Custom theme colors
- [ ] Theme presets (blue, green, purple)
- [ ] Automatic theme switching based on time
- [ ] Theme export/import
- [ ] High contrast mode
- [ ] Reduced motion option

### Potential Improvements
- [ ] Theme editor UI
- [ ] Theme sharing
- [ ] Theme marketplace
- [ ] Advanced color customization
- [ ] Theme analytics

## Resources

### Documentation
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

### Tools
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [CSS Variable Inspector](https://chrome.google.com/webstore/detail/css-variable-inspector/)
- [Theme Generator](https://uicolors.app/create)

## Conclusion

The theme system provides a robust, accessible, and performant solution for light and dark themes in UniPulse AI. It follows best practices and is designed for easy customization and maintenance.

For questions or issues, please refer to the troubleshooting section or contact the development team.
