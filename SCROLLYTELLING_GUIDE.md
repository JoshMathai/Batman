# ScrollyTelling Website - Technical Documentation

## Overview
The Gotham Archive is a ScrollyTelling website dedicated to Batman: The Animated Series. ScrollyTelling is a modern web design technique that uses scroll-triggered animations to tell a story as users navigate the page.

## Key ScrollyTelling Features Implemented

### 1. **Intersection Observer API**
- Automatically triggers animations when elements enter the viewport
- Uses `IntersectionObserver` for performance-optimized scroll detection
- No jank or frame drops - animations trigger only when visible

### 2. **CSS Animation Classes**
Multiple animation types applied to different elements:
- `.scroll-fade-in` - Simple opacity fade
- `.scroll-slide-in` - Slide in from left with fade
- `.scroll-pop-in` - Scale up with pop effect
- `.scroll-up` - Staggered upward movement
- Variants with delay classes for sequenced animations

### 3. **Staggered Animations**
- Hero section elements appear sequentially with `scroll-up-delay-1` through `scroll-up-delay-4`
- Exhibition panels use `scroll-pop-in-delay-1` and `scroll-pop-in-delay-2` for staggered entry
- Creates visual rhythm and guides the viewer's attention

### 4. **Parallax Scrolling**
- Quote section moves at a different rate than scroll
- Creates depth and visual interest
- Handled with `scroll-parallax` class and JavaScript offset calculations

### 5. **Interactive Navigation**
- Sticky navbar that updates active link as user scrolls
- Smooth scroll behavior for all anchor links
- Highlights current section in navigation

### 6. **Modal Content System**
- Clicking "Learn more" links opens modal-based detail pages
- Animated modal entrance/exit
- Can also navigate to detail pages as separate HTML files
- Detail pages include navigation back to main exhibition

## File Structure

```
/Batman
├── index.html                 # Main ScrollyTelling exhibit page
├── styles.css                 # All styling with animation keyframes
├── script.js                  # Intersection Observer, scroll handling, modals
├── README.md                  # Project documentation
└── details/
    ├── origins.html          # Detail page: Series origins
    ├── animation.html        # Detail page: Animation technique
    ├── cast.html            # Detail page: Voice cast
    ├── villains.html        # Detail page: Rogues gallery
    └── awards.html          # Detail page: Awards & legacy
```

## JavaScript Functionality

### Intersection Observer Setup
```javascript
- Watches elements with scroll animation classes
- Fires 'show' class when elements become visible
- Unobserves elements after animation triggers
- Uses 10% threshold and 100px bottom margin for optimal timing
```

### Scroll-Based Active Navigation
```javascript
- Detects which section is currently in view
- Updates navbar link colors accordingly
- Smooth highlighting of current exhibition room
```

### Detail Modal System
```javascript
- Intercepts panel-link clicks
- Generates content based on page name
- Displays in modal overlay
- Closes on ESC key or clicking outside
```

### Performance Optimization
```javascript
- Passive scroll event listeners
- RequestAnimationFrame throttling
- Efficient DOM queries and caching
```

## CSS Animation Keyframes

### slideUp
- Moves elements up 40px while fading in
- Used for hero section entrance

### popIn
- Cubic-bezier easing creates bouncy effect
- Scales from 0.95 to 1 with fade
- Used for panel entries

### slideInFromLeft
- 60px slide from left with fade
- Used for room headers

### fadeIn
- Simple opacity transition
- Used for section reveals

### glow-pulse
- Pulsing radial gradient for hero background
- Creates atmospheric effect

## Design Color Palette

- **Primary Gold**: `#C9A84C` (Art Deco gold)
- **Bright Gold**: `#FFD700` (Hover states)
- **Dark Background**: `#030306` (Nearly black)
- **Light Text**: `#EDE8DB` (Off-white)
- **Muted Text**: `#ccc` / `#aaa` (Article text)
- **Accents**: Various opacity levels of gold for borders

## Responsive Design

- Mobile-optimized layout
- Navbar stacks on smaller screens
- Font sizes scale appropriately
- Detail pages fully responsive
- Touch-friendly interaction targets

## Browser Compatibility

- Uses standard APIs (IntersectionObserver, CSS animations)
- Graceful degradation for older browsers
- Modern CSS features (grid, flexbox)
- Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)

## How to Enhance Further

1. **Add more detail pages** - Follow the same HTML template in `/details` folder
2. **Add background images** - Update hero-background or section backgrounds
3. **Add video content** - Embed videos in panels (maintain responsive behavior)
4. **Add timeline visualization** - Create animated timeline of BTAS history
5. **Add media gallery** - Implement image carousel for character designs
6. **Add search functionality** - Add search across exhibition content
7. **Add print styles** - Create print-friendly versions of detail pages
8. **Add accessibility features** - Further enhance ARIA labels and keyboard navigation

## Performance Notes

- Lazy loads images using native loading="lazy"
- CSS animations are GPU-accelerated (transform and opacity only)
- Intersection Observer prevents layout thrashing
- No heavy JavaScript libraries required
- Minimal DOM manipulation
- Smooth 60fps animations on modern devices
