import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { destinations, packages, testimonials } from '../data/tourismData';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ destination: '', date: '', guests: '2' });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.destination) params.set('q', search.destination);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/31817439/pexels-photo-31817439.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
            alt="Travel hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-24 pb-16 text-center text-white sm:px-6 lg:px-8">
          <span className="animate-fade-in rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
            Explore. Dream. Discover.
          </span>
          <h1 className="animate-fade-up mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Discover Incredible India
          </h1>
          <p className="animate-fade-up mt-4 max-w-xl text-lg text-white/90" style={{ animationDelay: '0.1s' }}>
            Handcrafted travel experiences across India's most breathtaking destinations.
            From the Himalayas to Kerala, find your next adventure.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-up mt-10 w-full max-w-4xl rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-lg sm:p-6"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-left">
                <label className="mb-1 block text-xs font-semibold text-gray-600">Destination</label>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={search.destination}
                  onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="text-left">
                <label className="mb-1 block text-xs font-semibold text-gray-600">When</label>
                <input
                  type="date"
                  value={search.date}
                  onChange={(e) => setSearch({ ...search, date: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="text-left">
                <label className="mb-1 block text-xs font-semibold text-gray-600">Travelers</label>
                <select
                  value={search.guests}
                  onChange={(e) => setSearch({ ...search, guests: e.target.value })}
                  className="input-field"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5+ Travelers</option>
                </select>
              </div>
              <button type="submit" className="btn-primary h-full self-end">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: '150+', label: 'Destinations' },
              { value: '12K+', label: 'Happy Travelers' },
              { value: '850+', label: 'Tour Packages' },
              { value: '15', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-primary-600">{s.value}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Popular Destinations</span>
          <h2 className="section-title mt-2">Where do you want to go?</h2>
          <p className="section-subtitle max-w-2xl">
            Explore our most sought-after destinations, loved by travelers around the globe.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((d) => (
            <DestinationCard key={d.id} dest={d} />
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Featured Packages</span>
            <h2 className="section-title mt-2">Curated Travel Experiences</h2>
            <p className="section-subtitle max-w-2xl">
              All-inclusive packages with handpicked stays, guided tours, and unforgettable memories.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 6).map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/packages" className="btn-accent">
              Explore All Packages
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Why Choose Us</span>
          <h2 className="section-title mt-2">Travel with confidence</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Best Price Guarantee', desc: 'Found a lower price elsewhere? We will match it and give you an extra discount.' },
            { icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M3 7l2-3h10l4 3', title: 'Handpicked Stays', desc: 'Every hotel and resort is personally vetted by our travel experts for quality.' },
            { icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', title: '24/7 Support', desc: 'Our travel concierge team is available around the clock during your trip.' },
          ].map((f) => (
            <div key={f.title} className="card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-400">Testimonials</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">What our travelers say</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-gray-800 p-6">
                <div className="flex gap-1 text-accent-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-16 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready for your next adventure?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Browse our curated packages and book your dream trip in minutes.
          </p>
          <Link to="/packages" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-transform hover:scale-105">
            Explore Packages
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
