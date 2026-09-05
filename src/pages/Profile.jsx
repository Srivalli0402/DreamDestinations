import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, logout, bookings } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Please log in</h1>
        <p className="mt-3 text-gray-500">You need to be logged in to view your profile.</p>
        <Link to="/login" className="btn-primary mt-6">Login</Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeBookings = bookings.filter((b) => b.status === 'Confirmed').length;
  const totalSpent = bookings.reduce((sum, b) => sum + (b.status === 'Confirmed' ? b.totalPrice : 0), 0);
  const joinedDate = new Date(user.joinedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-primary-100 font-display text-3xl font-bold text-primary-700 shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="font-display text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-6 text-center">
          <p className="font-display text-3xl font-bold text-primary-600">{bookings.length}</p>
          <p className="mt-1 text-sm text-gray-500">Total Bookings</p>
        </div>
        <div className="card p-6 text-center">
          <p className="font-display text-3xl font-bold text-primary-600">{activeBookings}</p>
          <p className="mt-1 text-sm text-gray-500">Active Trips</p>
        </div>
        <div className="card p-6 text-center">
          <p className="font-display text-3xl font-bold text-primary-600">{formatINR(totalSpent)}</p>
          <p className="mt-1 text-sm text-gray-500">Total Spent</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-gray-900">Account Information</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Full Name</span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium text-gray-900">{joinedDate}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-gray-900">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/my-bookings" className="btn-outline w-full">View My Bookings</Link>
            <Link to="/packages" className="btn-primary w-full">Browse Packages</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
