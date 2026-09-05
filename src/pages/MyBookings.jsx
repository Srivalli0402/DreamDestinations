import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

export default function MyBookings() {
  const { user, bookings, cancelBooking } = useApp();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Please log in</h1>
        <p className="mt-3 text-gray-500">You need to be logged in to view your bookings.</p>
        <Link to="/login" className="btn-primary mt-6">Login</Link>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sand-100 text-sand-400">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l1.5-3h15L21 7M3 7v13h18V7M3 7h18" /></svg>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-gray-900">No bookings yet</h1>
        <p className="mt-3 text-gray-500">Your travel adventures will appear here once you book a package.</p>
        <Link to="/packages" className="btn-primary mt-6">Explore Packages</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-center text-white">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">My Bookings</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">Manage your travel plans and upcoming adventures</p>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {bookings.map((b) => (
            <div key={b.id} className="card overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <img src={b.image} alt={b.packageTitle} className="h-48 w-full object-cover sm:h-auto sm:w-56" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        b.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {b.status}
                      </span>
                      <h2 className="mt-2 font-display text-lg font-bold text-gray-900">{b.packageTitle}</h2>
                      <p className="text-sm text-gray-500">{b.destination}</p>
                    </div>
                    <span className="font-display text-xl font-bold text-primary-600">{formatINR(b.totalPrice)}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-400">Booking ID</p>
                      <p className="font-medium text-gray-900">#{b.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Travel Date</p>
                      <p className="font-medium text-gray-900">{b.travelDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Travelers</p>
                      <p className="font-medium text-gray-900">{b.travelers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Accommodation</p>
                      <p className="font-medium text-gray-900">{b.accommodation}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link to={`/journey/${b.packageId}`} className="btn-outline text-xs">View Journey</Link>
                    {b.status === 'Confirmed' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="rounded-full border-2 border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
