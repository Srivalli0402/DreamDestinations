import { useParams, Link, useNavigate } from 'react-router-dom';
import { packages } from '../data/tourismData';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';
import NearbyAttractions from '../components/NearbyAttractions';

const INCLUDED_SERVICES = [
  'Accommodation in handpicked hotels',
  'Daily breakfast and selected meals',
  'All transfers in private AC vehicle',
  'Sightseeing with experienced local guide',
  'All applicable taxes and permit fees',
  '24/7 on-trip support',
];

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Package not found</h1>
        <p className="mt-3 text-gray-500">The package you are looking for does not exist.</p>
        <Link to="/packages" className="btn-primary mt-6">Back to Packages</Link>
      </div>
    );
  }

  const handleBook = () => {
    if (!user) {
      navigate('/login', { state: { from: `/packages/${pkg.id}` } });
      return;
    }
    navigate(`/journey/${pkg.id}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 overflow-hidden sm:h-96">
        <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 text-white sm:px-6 lg:px-8">
          <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold">{pkg.tag}</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{pkg.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4 text-accent-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {pkg.rating} ({pkg.reviews} reviews)
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {pkg.destination}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {pkg.duration}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-gray-900">Overview</h2>
            <p className="mt-3 text-gray-600">{pkg.description}</p>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="card p-4 text-center">
                <svg className="mx-auto h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="mt-2 text-xs text-gray-500">Destination</p>
                <p className="text-sm font-semibold text-gray-900">{pkg.destination}</p>
              </div>
              <div className="card p-4 text-center">
                <svg className="mx-auto h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="mt-2 text-xs text-gray-500">Duration</p>
                <p className="text-sm font-semibold text-gray-900">{pkg.duration}</p>
              </div>
              <div className="card p-4 text-center">
                <svg className="mx-auto h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <p className="mt-2 text-xs text-gray-500">Rating</p>
                <p className="text-sm font-semibold text-gray-900">{pkg.rating} / 5.0</p>
              </div>
              <div className="card p-4 text-center">
                <svg className="mx-auto h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                <p className="mt-2 text-xs text-gray-500">Starting Price</p>
                <p className="text-sm font-semibold text-gray-900">{formatINR(pkg.price)}</p>
              </div>
            </div>

            {/* Highlights */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {pkg.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>

            {/* Activities */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Activities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {pkg.activities.map((activity, i) => (
                <span key={i} className="rounded-full bg-sand-100 px-4 py-2 text-sm font-medium text-sand-700">
                  {activity}
                </span>
              ))}
            </div>

            {/* Popular attractions */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Popular Attractions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.popularAttractions.map((attraction, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 12l1.41 1.41L10 8.83V20h4V8.83l4.59 4.58L20 12l-8-8-8 8z" transform="rotate(180 12 12)" /></svg>
                  </span>
                  <span className="text-sm font-medium text-gray-700">{attraction}</span>
                </div>
              ))}
            </div>

            {/* Best time to visit */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Best Time to Visit</h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-primary-50 p-4">
              <svg className="h-6 w-6 flex-shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm font-medium text-primary-700">{pkg.bestTimeToVisit}</p>
            </div>

            {/* Itinerary */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
            <div className="mt-4 space-y-4">
              {pkg.itinerary.map((item) => (
                <div key={item.day} className="card p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 font-display text-sm font-bold text-white">
                      {item.day}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Included services */}
            <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">What's Included</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {INCLUDED_SERVICES.map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))}
            </div>

            {/* Nearby Attractions & Map */}
            <NearbyAttractions destinationId={pkg.destinationId} destinationName={pkg.destination} />

            <Link
              to={`/journey/${pkg.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View detailed journey breakdown
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-sm text-gray-400">Starting from</span>
                  <p className="font-display text-3xl font-bold text-gray-900">{formatINR(pkg.price)}</p>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
                <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination</span>
                  <span className="font-medium text-gray-900">{pkg.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium text-gray-900">{pkg.rating} / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Group Size</span>
                  <span className="font-medium text-gray-900">Max 12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Best Time</span>
                  <span className="font-medium text-gray-900">{pkg.bestTimeToVisit}</span>
                </div>
              </div>

              <button onClick={handleBook} className="btn-primary mt-6 w-full">
                Book Now
              </button>
              <p className="mt-3 text-center text-xs text-gray-400">
                Free cancellation up to 7 days before departure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
