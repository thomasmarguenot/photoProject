import './LoadingFallback.css';

export function LoadingFallback() {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}
