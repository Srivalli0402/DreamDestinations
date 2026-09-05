import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-primary-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  );
}
