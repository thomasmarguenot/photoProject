# React Performance Testing with Chrome DevTools MCP

This guide explains how to use the Chrome DevTools MCP server to analyze and optimize React performance in PhotoProject.

## Overview

The Chrome DevTools MCP server (`chrome-devtools-mcp`) provides powerful tools to:
- Profile React component rendering
- Measure Core Web Vitals (LCP, FID, CLS)
- Analyze network requests and bundle size
- Debug performance bottlenecks
- Track re-renders and memory usage

## Prerequisites

1. **Start your dev server:**
   ```bash
   pnpm dev
   ```
   Your site will be available at `https://photoproject.local:5173`

2. **Ensure Chrome DevTools MCP is installed** (already done):
   ```bash
   pnpm list chrome-devtools-mcp
   ```

## Available MCP Tools

### 1. Navigation & Page Management
- `list_pages` - List all open browser pages
- `new_page` - Open a new page with a URL
- `navigate_page` - Navigate to a URL
- `select_page` - Select a page for testing

### 2. Performance Analysis
- `performance_start_trace` - Start recording performance
- `performance_stop_trace` - Stop recording and get results
- `performance_analyze_insight` - Analyze specific performance insights

### 3. Snapshot & Screenshots
- `take_snapshot` - Capture page structure with UIDs
- `take_screenshot` - Take visual screenshot

### 4. Network & Console
- `list_network_requests` - View all network requests
- `get_network_request` - Get details of specific request
- `list_console_messages` - View console logs and errors

## Performance Testing Workflow

### Step 1: Open Your Site
```typescript
// Open PhotoProject in browser
await mcp_chrome-devtoo_new_page({
  url: 'https://photoproject.local:5173',
  timeout: 5000
});
```

### Step 2: Start Performance Recording
```typescript
// Start tracing with page reload
await mcp_chrome-devtoo_performance_start_trace({
  reload: true,      // Reload page to capture initial load
  autoStop: false    // Manually control when to stop
});
```

### Step 3: Interact with Your Site
Navigate to different pages to test:
- Home page load time
- Gallery image loading and animations
- About page rendering
- Route transitions performance

### Step 4: Stop Recording & Analyze
```typescript
// Stop trace and get results
const results = await mcp_chrome-devtoo_performance_stop_trace();

// Results include:
// - Core Web Vitals (LCP, FID, CLS)
// - Performance insights
// - Render blocking resources
// - JavaScript execution time
```

### Step 5: Analyze Specific Insights
```typescript
// Get detailed analysis of specific metric
await mcp_chrome-devtoo_performance_analyze_insight({
  insightName: 'LCPBreakdown'  // or 'DocumentLatency', 'RenderBlocking', etc.
});
```

## Common Performance Tests

### Test 1: Initial Page Load
Measure how fast the home page loads:
```typescript
// Navigate to home
await navigate_page({ url: 'https://photoproject.local:5173' });

// Start trace with reload
await performance_start_trace({ reload: true, autoStop: true });

// Results will show:
// - Time to First Byte (TTFB)
// - First Contentful Paint (FCP)
// - Largest Contentful Paint (LCP)
```

### Test 2: Gallery Performance
Test the Gallery page with image loading:
```typescript
// Navigate to gallery
await navigate_page({ url: 'https://photoproject.local:5173/gallery' });

// Start trace
await performance_start_trace({ reload: true, autoStop: false });

// Wait for images to load (simulate user interaction)
// Then stop trace
await performance_stop_trace();

// Check:
// - Image lazy loading performance
// - Framer Motion animation impact
// - Re-renders during scroll
```

### Test 3: Route Transitions
Test React Router navigation performance:
```typescript
// Start on home
await navigate_page({ url: 'https://photoproject.local:5173' });

// Start trace without reload
await performance_start_trace({ reload: false, autoStop: false });

// Navigate between routes
await navigate_page({ url: 'https://photoproject.local:5173/gallery' });
await navigate_page({ url: 'https://photoproject.local:5173/about' });

// Stop and analyze
await performance_stop_trace();
```

### Test 4: Network Requests Analysis
Check bundle size and API calls:
```typescript
// Navigate to page
await navigate_page({ url: 'https://photoproject.local:5173' });

// Get all network requests
const requests = await list_network_requests({
  resourceTypes: ['script', 'document', 'image'],
  pageSize: 50
});

// Analyze:
// - JavaScript bundle sizes
// - Image sizes (WebP optimization)
// - Number of requests
// - Caching headers
```

### Test 5: Console Errors & Warnings
Check for React warnings or errors:
```typescript
// Navigate to page
await navigate_page({ url: 'https://photoproject.local:5173/gallery' });

// Get console messages
const messages = await list_console_messages();

// Look for:
// - React warnings (key props, hooks rules)
// - Performance warnings
// - JavaScript errors
```

## React-Specific Performance Metrics

### What to Monitor

1. **Component Render Time**
   - Check LCP for main components
   - Identify slow rendering components

2. **Re-renders**
   - Use React DevTools Profiler (manual)
   - Monitor console for excessive renders

3. **Bundle Size**
   - Check JavaScript chunk sizes
   - Verify code splitting is working
   - Ensure lazy loading of routes

4. **Animations Performance**
   - Framer Motion should use GPU acceleration
   - Check for layout thrashing
   - Monitor FPS during animations

5. **Memory Leaks**
   - Check for increasing memory usage
   - Verify cleanup in useEffect hooks

## Performance Optimization Checklist

Based on test results, optimize:

- ✅ **Lazy load routes** - Already implemented with React.lazy()
- ✅ **Image optimization** - Using WebP format
- ✅ **Code splitting** - Vite handles this automatically
- ⚠️ **Minimize re-renders** - Use React.memo() if needed
- ⚠️ **Optimize Framer Motion** - Use `layoutId` and GPU properties
- ⚠️ **Reduce bundle size** - Check for unused dependencies
- ⚠️ **Implement caching** - Service Worker for offline support

## Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## Example: Full Performance Test Script

Here's a complete example in Copilot Chat:

```
1. Open PhotoProject:
   - New page: https://photoproject.local:5173

2. Test Home page performance:
   - Start trace with reload
   - Analyze LCP and FCP

3. Test Gallery page:
   - Navigate to /gallery
   - Start trace
   - Stop after images load
   - Check network requests for images

4. Check console for errors:
   - List console messages
   - Look for React warnings

5. Analyze results:
   - Review Core Web Vitals
   - Check bundle sizes
   - Identify bottlenecks
```

## Tips for Best Results

1. **Test in incognito mode** - Avoid extension interference
2. **Use production build** - Run `pnpm build && pnpm preview`
3. **Test on different devices** - Use Chrome DevTools device emulation
4. **Test with slow network** - Throttle network to 3G
5. **Test with CPU throttling** - Simulate slower devices

## Next Steps

After analyzing performance:
1. Document findings in GitHub issues
2. Create optimization tasks
3. Re-test after improvements
4. Track metrics over time

## Resources

- [Chrome DevTools MCP Documentation](https://github.com/modelcontextprotocol/chrome-devtools-mcp)
- [Web Vitals Guide](https://web.dev/vitals/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Framer Motion Performance](https://www.framer.com/motion/performance/)
