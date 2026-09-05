import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { packages } from '../data/tourismData';
import { formatINR } from '../utils/currency';
import { useApp } from '../context/AppContext';

const TRANSPORT_OPTIONS = [
  { id: 'bus', label: 'Bus', desc: 'Comfortable AC sleeper bus with reclining seats', pricePerTraveler: 1200 },
  { id: 'train', label: 'Train', desc: 'AC 3-tier train travel with meals included', pricePerTraveler: 2500 },
  { id: 'flight', label: 'Flight', desc: 'Economy class flight with airport transfers', pricePerTraveler: 6500 },
  { id: 'cab', label: 'Private Cab', desc: 'Dedicated chauffeur-driven SUV for your group', pricePerTraveler: 4500 },
];

const HOTEL_OPTIONS = [
  { id: 'standard', label: 'Standard', desc: '3-star hotel with clean rooms and daily breakfast', pricePerTraveler: 0 },
  { id: 'premium', label: 'Premium', desc: '4-star hotel with premium amenities and pool', pricePerTraveler: 5000 },
  { id: 'luxury', label: 'Luxury', desc: '5-star resort with spa, fine dining, and suite rooms', pricePerTraveler: 12000 },
];

const EXTRA_SERVICES = [
  { id: 'guide', label: 'Local Guide', desc: 'Experienced local guide for sightseeing', price: 800 },
  { id: 'pickup', label: 'Airport/Railway Pickup', desc: 'Door-to-door pickup and drop service', price: 600 },
  { id: 'cab', label: 'Sightseeing Cab', desc: 'Private cab for local sightseeing tours', price: 1500 },
  { id: 'insurance', label: 'Travel Insurance', desc: 'Comprehensive travel insurance coverage', price: 400 },
  { id: 'breakfast', label: 'Breakfast', desc: 'Daily buffet breakfast at your hotel', price: 350 },
  { id: 'adventure', label: 'Adventure Activity', desc: 'Choice of trekking, rafting, or paragliding', price: 2000 },
];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addBooking } = useApp();
  const pkg = packages.find((p) => p.id === id);

  const journey = location.state?.journey || null;

  const [form, setForm] = useState({
    travelers: journey?.travelers || 2,
    travelDate: journey?.startDate || '',
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    specialRequests: '',
  });
  const [transport, setTransport] = useState('train');
  const [hotel, setHotel] = useState('standard');
  const [extras, setExtras] = useState([]);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  if (!pkg) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Package not found</h1>
        <Link to="/packages" className="btn-primary mt-6">Back to Packages</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900">Please log in to book</h1>
        <p className="mt-3 text-gray-500">You need an account to make a booking.</p>
        <Link to="/login" state={{ from: `/booking/${pkg.id}` }} className="btn-primary mt-6">Login</Link>
      </div>
    );
  }

  const transportOption = TRANSPORT_OPTIONS.find((t) => t.id === transport);
  const hotelOption = HOTEL_OPTIONS.find((h) => h.id === hotel);
  const selectedExtras = EXTRA_SERVICES.filter((s) => extras.includes(s.id));

  const packageCost = pkg.price * form.travelers;
  const transportCost = transportOption.pricePerTraveler * form.travelers;
  const hotelCost = hotelOption.pricePerTraveler * form.travelers;
  const extrasCost = selectedExtras.reduce((sum, s) => sum + s.price, 0);
  const totalPrice = packageCost + transportCost + hotelCost + extrasCost;

  const toggleExtra = (serviceId) => {
    setExtras((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    );
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.travelDate) e.travelDate = 'Please select a travel date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const booking = addBooking({
      packageId: pkg.id,
      packageTitle: pkg.title,
      destination: pkg.destination,
      image: pkg.image,
      travelers: form.travelers,
      travelDate: form.travelDate,
      transport: transportOption.label,
      hotel: hotelOption.label,
      extras: selectedExtras.map((s) => s.label),
      packageCost,
      transportCost,
      hotelCost,
      extrasCost,
      totalPrice,
      contactName: form.fullName,
      contactEmail: form.email,
      contactPhone: form.phone,
      specialRequests: form.specialRequests,
      pickupCity: journey?.pickupCity || '',
      endDate: journey?.endDate || '',
    });
    setConfirmed(booking);
    window.scrollTo(0, 0);
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="mt-3 text-gray-500">Your dream trip to {pkg.destination} is all set. A confirmation has been sent to {confirmed.contactEmail}.</p>

          <div className="mt-8 rounded-xl bg-sand-50 p-6 text-left">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div><span className="text-gray-500">Booking ID:</span> <span className="font-semibold text-gray-900">#{confirmed.id}</span></div>
              <div><span className="text-gray-500">Package:</span> <span className="font-semibold text-gray-900">{confirmed.packageTitle}</span></div>
              <div><span className="text-gray-500">Pickup City:</span> <span className="font-semibold text-gray-900">{confirmed.pickupCity || 'N/A'}</span></div>
              <div><span className="text-gray-500">Destination:</span> <span className="font-semibold text-gray-900">{confirmed.destination}</span></div>
              <div><span className="text-gray-500">Start Date:</span> <span className="font-semibold text-gray-900">{confirmed.travelDate}</span></div>
              <div><span className="text-gray-500">End Date:</span> <span className="font-semibold text-gray-900">{confirmed.endDate || 'N/A'}</span></div>
              <div><span className="text-gray-500">Travelers:</span> <span className="font-semibold text-gray-900">{confirmed.travelers}</span></div>
              <div><span className="text-gray-500">Transport:</span> <span className="font-semibold text-gray-900">{confirmed.transport}</span></div>
              <div><span className="text-gray-500">Hotel:</span> <span className="font-semibold text-gray-900">{confirmed.hotel}</span></div>
              <div><span className="text-gray-500">Extra Services:</span> <span className="font-semibold text-gray-900">{confirmed.extras.length > 0 ? confirmed.extras.join(', ') : 'None'}</span></div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Package Cost</span><span className="font-medium text-gray-900">{formatINR(confirmed.packageCost)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Transport Cost</span><span className="font-medium text-gray-900">{formatINR(confirmed.transportCost)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Hotel Cost</span><span className="font-medium text-gray-900">{formatINR(confirmed.hotelCost)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Extra Services</span><span className="font-medium text-gray-900">{formatINR(confirmed.extrasCost)}</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-2"><span className="font-semibold text-gray-900">Grand Total</span><span className="font-display text-lg font-bold text-primary-600">{formatINR(confirmed.totalPrice)}</span></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/my-bookings" className="btn-primary">View My Bookings</Link>
            <Link to="/packages" className="btn-outline">Browse More Packages</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-center text-white">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Book Your Trip</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{pkg.title} — {pkg.destination}</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Journey info banner */}
        {journey && (
          <div className="mb-6 card flex flex-wrap items-center gap-4 p-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-gray-500">From:</span>
              <span className="font-semibold text-gray-900">{journey.pickupCity}</span>
            </div>
            <div className="hidden h-4 w-px bg-gray-200 sm:block" />
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="text-gray-500">Dates:</span>
              <span className="font-semibold text-gray-900">{journey.startDate} → {journey.endDate}</span>
            </div>
            <div className="hidden h-4 w-px bg-gray-200 sm:block" />
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="text-gray-500">Travelers:</span>
              <span className="font-semibold text-gray-900">{journey.travelers}</span>
            </div>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Traveler Information */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Traveler Information</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input-field" />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Travel Date</label>
                  <input type="date" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} min={new Date().toISOString().split('T')[0]} className="input-field" />
                  {errors.travelDate && <p className="mt-1 text-xs text-red-500">{errors.travelDate}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Number of Travelers</label>
                  <select value={form.travelers} onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) })} className="input-field">
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">Special Requests (optional)</label>
                <textarea rows={3} value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className="input-field resize-none" placeholder="Any dietary needs, accessibility, or preferences..." />
              </div>
            </div>

            {/* Transport Selection */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Select Transport</h2>
              <p className="mt-1 text-sm text-gray-500">Choose how you'd like to travel to your destination.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {TRANSPORT_OPTIONS.map((option) => {
                  const selected = transport === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTransport(option.id)}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        selected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                      }`}>
                        {selected && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{option.label}</span>
                          <span className="text-sm font-semibold text-primary-600">{formatINR(option.pricePerTraveler)}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{option.desc}</p>
                        <p className="mt-1 text-xs text-gray-400">per traveler</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hotel Selection */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Select Hotel</h2>
              <p className="mt-1 text-sm text-gray-500">Choose your preferred accommodation category.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {HOTEL_OPTIONS.map((option) => {
                  const selected = hotel === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setHotel(option.id)}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        selected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                      }`}>
                        {selected && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{option.label}</span>
                          <span className="text-sm font-semibold text-primary-600">
                            {option.pricePerTraveler === 0 ? 'Included' : formatINR(option.pricePerTraveler)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{option.desc}</p>
                        <p className="mt-1 text-xs text-gray-400">{option.pricePerTraveler === 0 ? 'base package' : 'per traveler'}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Services */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Extra Services</h2>
              <p className="mt-1 text-sm text-gray-500">Enhance your trip with optional add-ons. Select any combination.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {EXTRA_SERVICES.map((service) => {
                  const selected = extras.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        selected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleExtra(service.id)}
                        className="mt-0.5 h-5 w-5 flex-shrink-0 accent-primary-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{service.label}</span>
                          <span className="text-sm font-semibold text-primary-600">{formatINR(service.price)}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{service.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full text-base">
              Confirm Booking — {formatINR(totalPrice)}
            </button>
          </form>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="h-40 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-gray-900">{pkg.title}</h3>
                <p className="text-sm text-gray-500">{pkg.destination}</p>
                <p className="mt-1 text-sm text-gray-500">{pkg.duration}</p>

                {/* Trip details */}
                <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Travel Date</span>
                    <span className="font-medium text-gray-900">{form.travelDate || 'Not selected'}</span>
                  </div>
                  {journey?.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date</span>
                      <span className="font-medium text-gray-900">{journey.endDate}</span>
                    </div>
                  )}
                  {journey?.pickupCity && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pickup City</span>
                      <span className="font-medium text-gray-900">{journey.pickupCity}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Travelers</span>
                    <span className="font-medium text-gray-900">{form.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transport</span>
                    <span className="font-medium text-gray-900">{transportOption.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hotel</span>
                    <span className="font-medium text-gray-900">{hotelOption.label}</span>
                  </div>
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-500 flex-shrink-0">Extras</span>
                      <span className="text-right font-medium text-gray-900">{selectedExtras.map((s) => s.label).join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Cost breakdown */}
                <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Package Cost <span className="text-xs text-gray-400">({form.travelers} travelers)</span></span>
                    <span className="font-medium text-gray-900">{formatINR(packageCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transport <span className="text-xs text-gray-400">({transportOption.label})</span></span>
                    <span className="font-medium text-gray-900">{formatINR(transportCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hotel <span className="text-xs text-gray-400">({hotelOption.label})</span></span>
                    <span className="font-medium text-gray-900">{formatINR(hotelCost)}</span>
                  </div>
                  {extrasCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Extra Services</span>
                      <span className="font-medium text-gray-900">{formatINR(extrasCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <span className="font-semibold text-gray-900">Grand Total</span>
                    <span className="font-display text-xl font-bold text-primary-600">{formatINR(totalPrice)}</span>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Free cancellation up to 7 days before departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
