# UniPulse AI Frontend

A modern, responsive React application for analyzing sentiment across IIT subreddits.

## Features

### 🎨 Modern UI/UX
- **Dark Theme**: GitHub-inspired dark theme with custom CSS variables
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Smooth Animations**: Fade-in, slide-in, and pulse animations for better user experience
- **Hover Effects**: Interactive hover states on buttons, cards, and navigation

### 📊 Dashboard
- **IIT Selection**: Quick selector with 23 IITs
- **Overall Sentiment**: Large sentiment score display with emoji indicator
- **Category Breakdown**: Bar chart showing sentiment by category
- **Category Cards**: Individual cards for each category with progress bars
- **Top Posts**: Feed of top sentiment posts with detailed information

### 🏆 Compare Page
- **All IITs Comparison**: Side-by-side comparison of all 23 IITs
- **Sorting Options**: Sort by score or name
- **Visual Rankings**: Color-coded cards with rank indicators
- **Interactive Chart**: Bar chart with color-coded sentiment scores

### 🎯 Components

#### Reusable Components
- **Navbar**: Sticky navigation with active state indicators
- **PostFeed**: Card-based post display with sentiment badges
- **CategoryBars**: Progress bars for category sentiment
- **Loading**: Animated loading component
- **Error**: Error display with retry option
- **StatCard**: Reusable statistic card component

#### Design System
- **CSS Variables**: Consistent color palette and spacing
- **Utility Classes**: Flexbox, grid, and spacing utilities
- **Component Classes**: Card, button, badge, progress bar styles
- **Animations**: Pre-defined animation classes

## Tech Stack

- **React 19**: Latest React with hooks
- **Vite**: Fast build tool and dev server
- **Recharts**: Charting library for data visualization
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── PostFeed.jsx        # Post feed component
│   ├── CategoryBars.jsx    # Category progress bars
│   ├── Loading.jsx         # Loading component
│   ├── Error.jsx           # Error component
│   └── StatCard.jsx        # Stat card component
├── pages/
│   ├── Dashboard.jsx       # Main dashboard
│   └── Compare.jsx         # Comparison page
├── api.js                  # API service
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
├── index.css               # Global styles
└── App.css                 # App-specific styles
```

## Design System

### Colors

```css
--bg-primary: #0d1117
--bg-secondary: #161b22
--bg-tertiary: #21262d
--text-primary: #c9d1d9
--text-secondary: #8b949e
--accent-primary: #58a6ff
--accent-success: #10b981
--accent-warning: #f59e0b
--accent-danger: #ef4444
```

### Typography

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-mono: 'SF Mono', 'Fira Code', monospace
```

### Spacing

```css
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 12px
--radius-xl: 16px
```

## API Integration

The frontend communicates with the backend API:

```javascript
// Get sentiment for specific IIT
GET /api/sentiment/{iit_key}

// Compare all IITs
GET /api/compare
```

## Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components load on demand
- **CSS Optimization**: Minimal CSS with utility classes
- **Image Optimization**: Progressive image loading (when added)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] TypeScript migration
- [ ] State management (Redux/Zustand)
- [ ] PWA support
- [ ] Offline mode
- [ ] Real-time updates (WebSocket)
- [ ] Export functionality
- [ ] Advanced filtering
- [ ] User preferences
- [ ] Accessibility improvements

## Contributing

1. Follow the existing code style
2. Use the design system components
3. Test on multiple screen sizes
4. Ensure accessibility standards

## License

MIT
