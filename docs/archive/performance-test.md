# Performance Test Script for Copilot Chat

Use this script with GitHub Copilot Chat to run automated performance tests using Chrome DevTools MCP.

## Quick Start

Copy and paste these commands in Copilot Chat to run performance tests:

## Test 1: Home Page Performance

```
Using Chrome DevTools MCP:

1. Create new page with URL: https://photoproject.local:5173
2. Start performance trace with reload: true and autoStop: true
3. Analyze the LCPBreakdown insight
4. List all network requests filtered by 'script' and 'document' types
5. List console messages
```

## Test 2: Gallery Page Performance

```
Using Chrome DevTools MCP:

1. Navigate to https://photoproject.local:5173/gallery
2. Start performance trace with reload: true and autoStop: false
3. Wait 3 seconds (for images to load)
4. Stop performance trace
5. Analyze the DocumentLatency insight
6. List network requests filtered by 'image' type
7. Take a screenshot
```

## Test 3: Route Navigation Performance

```
Using Chrome DevTools MCP:

1. Navigate to https://photoproject.local:5173
2. Start performance trace with reload: false and autoStop: false
3. Navigate to https://photoproject.local:5173/about
4. Navigate to https://photoproject.local:5173/gallery
5. Stop performance trace
6. List console messages to check for warnings
```

## Test 4: Network Analysis

```
Using Chrome DevTools MCP:

1. Navigate to https://photoproject.local:5173
2. List all network requests with pageSize: 100
3. For each JavaScript file larger than 100KB, get request details
4. Calculate total page weight
5. Check for unoptimized images
```

## Test 5: Full Performance Audit

```
Using Chrome DevTools MCP:

1. Create new page with URL: https://photoproject.local:5173
2. Start performance trace with reload: true and autoStop: true
3. Analyze these insights:
   - LCPBreakdown
   - DocumentLatency
   - RenderBlocking
4. List network requests for all resource types
5. List console messages
6. Take page snapshot
7. Provide a summary of:
   - Core Web Vitals scores
   - Top 5 largest resources
   - Any console errors or warnings
   - Performance recommendations
```

## Expected Results Format

After running tests, expect results like:

```
✅ Core Web Vitals
- LCP: 1.2s (Good - target < 2.5s)
- FID: 45ms (Good - target < 100ms)
- CLS: 0.05 (Good - target < 0.1)

📦 Bundle Analysis
- main.js: 125 KB
- vendor.js: 340 KB
- Total JS: 465 KB

🖼️ Images
- Total images: 24
- Format: WebP ✅
- Average size: 85 KB

⚠️ Issues Found
- 2 React warnings in console
- 1 render blocking resource

💡 Recommendations
1. Consider code splitting for vendor bundle
2. Fix React key prop warnings
3. Preload critical fonts
```

## Automation Script

For automated testing, create this npm script in package.json:

```json
{
  "scripts": {
    "perf:test": "# Run performance tests via Copilot Chat MCP",
    "perf:report": "# Generate performance report"
  }
}
```

## Integration with CI/CD

To run performance tests in CI:

1. Install Chrome DevTools MCP in CI environment
2. Run tests before deployment
3. Fail build if metrics exceed thresholds
4. Generate performance report

## Notes

- Tests should run with dev server: `pnpm dev`
- For production testing: `pnpm build && pnpm preview`
- Always test in clean browser state
- Run tests multiple times for consistency
