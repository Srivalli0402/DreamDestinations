import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l1.5-3h15L21 7M3 7v13h18V7M3 7h18M9 11h6" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold text-white">
                Dream<span className="text-primary-400">Destinations</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Curating unforgettable travel experiences around the world since 2015.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 transition-colors hover:text-white">Home</Link></li>
              <li><Link to="/packages" className="text-gray-400 transition-colors hover:text-white">Packages</Link></li>
              <li><Link to="/contact" className="text-gray-400 transition-colors hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Account</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/login" className="text-gray-400 transition-colors hover:text-white">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 transition-colors hover:text-white">Sign Up</Link></li>
              <li><Link to="/profile" className="text-gray-400 transition-colors hover:text-white">Profile</Link></li>
              <li><Link to="/my-bookings" className="text-gray-400 transition-colors hover:text-white">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>123 Wanderlust Ave, New York</li>
              <li>hello@dreamdestinations.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {['facebook', 'instagram', 'twitter'].map((s) => (
                <a key={s} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    {s === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                    {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                    {s === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dream Destinations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
