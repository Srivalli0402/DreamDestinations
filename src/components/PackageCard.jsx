import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

export default function PackageCard({ pkg }) {
  return (
    <div className="group card overflow-hidden hover:shadow-card-hover">
      <Link to={`/packages/${pkg.id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {pkg.tag}
          </span>
          <div className="absolute bottom-3 left-4 flex items-center gap-1 text-white">
            <svg className="h-4 w-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold">{pkg.rating}</span>
            <span className="text-xs opacity-80">({pkg.reviews} reviews)</span>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-600">{pkg.destination}</p>
        <Link to={`/packages/${pkg.id}`}>
          <h3 className="mt-1 font-display text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600">
            {pkg.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{pkg.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pkg.duration}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">from</span>
            <p className="font-display text-xl font-bold text-gray-900">
              {formatINR(pkg.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
