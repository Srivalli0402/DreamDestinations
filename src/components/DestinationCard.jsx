import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

export default function DestinationCard({ dest }) {
  return (
    <Link
      to="/packages"
      className="group relative block overflow-hidden rounded-2xl shadow-card transition-all duration-300 hover:shadow-card-hover"
    >
      <div className="h-64 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="flex items-center gap-1.5 text-sm opacity-90">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {dest.country}
        </div>
        <h3 className="mt-1 font-display text-2xl font-bold">{dest.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm">
            <svg className="h-4 w-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {dest.rating}
          </span>
          <span className="text-sm font-semibold">from {formatINR(dest.price)}</span>
        </div>
      </div>
    </Link>
  );
}
