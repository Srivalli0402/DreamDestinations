import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { packages } from '../data/tourismData';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

const POPULAR_CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Visakhapatnam',
];

export default function JourneyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const pkg = packages.find((p) => p.id === id);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    pickupCity: '',
    destination: pkg ? pkg.destination : '',
    startDate: '',
    endDate: '',
    travelers: 2,
  });
  const [errors, setErrors] = useState({});

  if (!pkg) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Journey not found</h1>
        <Link to="/packages" className="btn-primary mt-6">Back to Packages</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Please log in to continue</h1>
        <p className="mt-3 text-gray-500">You need an account to plan your journey.</p>
        <Link to="/login" state={{ from: `/journey/${pkg.id}` }} className="btn-primary mt-6">Login</Link>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.pickupCity.trim()) e.pickupCity = 'Pickup city is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      e.endDate = 'End date cannot be before start date';
    }
    if (form.travelers < 1) e.travelers = 'At least 1 traveler is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate(`/booking/${pkg.id}`, {
      state: {
        journey: {
          pickupCity: form.pickupCity,
          destination: form.destination,
          startDate: form.startDate,
          endDate: form.endDate,
          travelers: form.travelers,
        },
      },
    });
  };

  const tripDays = form.startDate && form.endDate
    ? Math.max(0, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-center text-white">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Plan Your Journey</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{pkg.title} — {pkg.destination}</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Journey planning form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Journey Details</h2>
              <p className="mt-1 text-sm text-gray-500">Tell us about your travel plans and we'll prepare your booking.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* Pickup city */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Pickup City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    list="pickup-cities"
                    value={form.pickupCity}
                    onChange={(e) => handleChange('pickupCity', e.target.value)}
                    placeholder="Enter or select your departure city"
                    className={`input-field ${errors.pickupCity ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                  />
                  <datalist id="pickup-cities">
                    {POPULAR_CITIES.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  {errors.pickupCity && <p className="mt-1 text-xs text-red-500">{errors.pickupCity}</p>}
                </div>

                {/* Destination (auto-filled, read-only) */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Destination</label>
                  <input
                    type="text"
                    value={form.destination}
                    readOnly
                    className="input-field cursor-not-allowed bg-gray-50 text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">Auto-filled from your selected package</p>
                </div>

                {/* Start date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Travel Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    min={today}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className={`input-field ${errors.startDate ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                  />
                  {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
                </div>

                {/* End date */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Travel End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate || today}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className={`input-field ${errors.endDate ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                  />
                  {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
                </div>

                {/* Number of travelers */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Number of Travelers <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleChange('travelers', Math.max(1, form.travelers - 1))}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={form.travelers}
                      onChange={(e) => handleChange('travelers', parseInt(e.target.value) || 1)}
                      className={`input-field text-center ${errors.travelers ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleChange('travelers', form.travelers + 1)}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  {errors.travelers && <p className="mt-1 text-xs text-red-500">{errors.travelers}</p>}
                </div>

                {/* Trip duration display */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Trip Length</label>
                  <div className="input-field flex items-center justify-center bg-gray-50 text-gray-600">
                    {tripDays > 0 ? `${tripDays} day${tripDays !== 1 ? 's' : ''}` : 'Select dates'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to={`/packages/${pkg.id}`} className="btn-outline w-full sm:w-auto">
                Back to Package
              </Link>
              <button type="submit" className="btn-primary w-full sm:flex-1">
                Continue to Booking
              </button>
            </div>
          </form>

          {/* Package summary sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="h-40 w-full object-cover" />
              <div className="p-6">
                <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">{pkg.tag}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-gray-900">{pkg.title}</h3>
                <p className="text-sm text-gray-500">{pkg.destination}</p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {pkg.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {pkg.duration}
                  </span>
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Package duration</span>
                    <span className="font-medium text-gray-900">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Best time to visit</span>
                    <span className="font-medium text-gray-900">{pkg.bestTimeToVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price per person</span>
                    <span className="font-medium text-gray-900">{formatINR(pkg.price)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <span className="font-semibold text-gray-900">Estimated total</span>
                    <span className="font-display text-xl font-bold text-primary-600">{formatINR(pkg.price * form.travelers)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Top Highlights</p>
                  <ul className="mt-2 space-y-2">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
