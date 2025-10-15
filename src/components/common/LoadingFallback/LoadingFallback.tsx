import './LoadingFallback.css';

export function LoadingFallback() {
  return (
    <div className="loading-fallback" role="status">
      <div className="loading-cube"></div>
    </div>
  );
}
