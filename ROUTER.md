# React Router Configuration

This project uses **React Router v7** with lazy loading and Suspense for optimal code splitting.

## 📦 Installation

React Router is already installed:

```bash
pnpm add react-router-dom
```

## ⚙️ Configuration

### Router Setup (`src/router.tsx`)

The router is configured with lazy-loaded routes for better performance:

```typescript
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
```

### Layout with Suspense (`src/components/layout/Layout/Layout.tsx`)

The Layout component uses `<Outlet />` and `<Suspense>` for lazy-loaded routes:

```typescript
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingFallback } from '@/components/common/LoadingFallback';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

### App Component (`src/App.tsx`)

The main App component uses `RouterProvider`:

```typescript
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## 🎨 Loading Fallback

A custom loading component is shown while routes are being loaded:

**Component** (`src/components/common/LoadingFallback/LoadingFallback.tsx`):

```typescript
export function LoadingFallback() {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}
```

**Styles** (`src/components/common/LoadingFallback/LoadingFallback.css`):

```css
@reference "../../../index.css";

.loading-fallback {
  @apply flex flex-col items-center justify-center min-h-screen gap-4;
}

.loading-spinner {
  @apply w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin;
}

.loading-text {
  @apply text-gray-600 text-lg;
}
```

## 🔗 Navigation

### Using Link Component

Replace `<a>` tags with `<Link>` for client-side navigation:

```typescript
import { Link } from 'react-router-dom';

// ❌ Bad - Full page reload
<a href="/about">About</a>

// ✅ Good - Client-side navigation
<Link to="/about">About</Link>
```

### Navigation Examples

**Header** (`src/components/layout/Header/Header.tsx`):

```typescript
<nav className="header-nav">
  <Link to="/" className="header-link">
    Home
  </Link>
  <Link to="/about" className="header-link">
    About
  </Link>
  <Link to="/contact" className="header-link">
    Contact
  </Link>
</nav>
```

**Footer** (`src/components/layout/Footer/Footer.tsx`):

```typescript
<div className="footer-links">
  <Link to="/privacy" className="footer-link">
    Privacy Policy
  </Link>
  <Link to="/terms" className="footer-link">
    Terms of Service
  </Link>
</div>
```

## 📄 Adding New Routes

### 1. Create the Page Component

```bash
mkdir -p src/pages/Contact
touch src/pages/Contact/{Contact.tsx,Contact.css,index.ts}
```

**Contact.tsx**:

```typescript
import './Contact.css';

export function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Get in touch with us!</p>
    </div>
  );
}
```

**index.ts** (important for lazy loading):

```typescript
export { Contact } from './Contact';
export { Contact as default } from './Contact';
```

### 2. Add Route to Router

```typescript
// In src/router.tsx
const Contact = lazy(() => import('@/pages/Contact'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // ... existing routes
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);
```

## 🎯 Route Types

### Index Route

```typescript
{
  index: true,
  element: <Home />,
}
```

### Path Route

```typescript
{
  path: 'about',
  element: <About />,
}
```

### Catch-all Route (404)

```typescript
{
  path: '*',
  element: <NotFound />,
}
```

### Nested Routes

```typescript
{
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardHome />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
  ],
}
```

### Dynamic Routes

```typescript
{
  path: 'users/:id',
  element: <UserProfile />,
}
```

## 🪝 Router Hooks

### useNavigate

Programmatic navigation:

```typescript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
    // Or go back: navigate(-1);
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

### useParams

Access route parameters:

```typescript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  return <div>User ID: {id}</div>;
}
```

### useLocation

Get current location:

```typescript
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();

  return <div>Current path: {location.pathname}</div>;
}
```

### useSearchParams

Work with query parameters:

```typescript
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');

  return <div>Search query: {query}</div>;
}
```

## ⚡ Performance Benefits

### Code Splitting

Each route is loaded only when needed:

```typescript
// Home page code is NOT loaded until user visits /
const Home = lazy(() => import('@/pages/Home'));

// About page code is NOT loaded until user visits /about
const About = lazy(() => import('@/pages/About'));
```

### Bundle Analysis

After build, check the dist folder:

```bash
pnpm run build

# Output shows separate chunks:
# dist/assets/index-BrsxcP0C.js  (Home page)
# dist/assets/index-DKJJmR9F.js  (About page)
# dist/assets/index-BAdPlio5.js  (NotFound page)
```

## 🔍 Active Link Styling

Use `NavLink` for active state styling:

```typescript
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? 'header-link active' : 'header-link'
  }
>
  About
</NavLink>
```

Or with CSS:

```css
.header-link {
  @apply text-gray-600 hover:text-gray-900 transition-colors;
}

.header-link.active {
  @apply text-blue-600 font-bold;
}
```

## 📚 Resources

- [React Router Documentation](https://reactrouter.com/)
- [Code Splitting with React Router](https://reactrouter.com/en/main/route/lazy)
- [React Suspense Documentation](https://react.dev/reference/react/Suspense)

## 🚀 Current Routes

| Path     | Component | Description                        |
| -------- | --------- | ---------------------------------- |
| `/`      | Home      | Landing page with feature showcase |
| `/about` | About     | About page                         |
| `*`      | NotFound  | 404 error page                     |

All routes are lazy-loaded and wrapped in Suspense with a loading fallback.
