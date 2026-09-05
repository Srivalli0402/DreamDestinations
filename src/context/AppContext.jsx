import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dd_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('dd_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dd_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dd_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dd_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = (email, password) => {
    const existing = JSON.parse(localStorage.getItem('dd_users') || '[]');
    const found = existing.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { error: 'Invalid email or password.' };
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { ok: true };
  };

  const register = (name, email, password) => {
    const existing = JSON.parse(localStorage.getItem('dd_users') || '[]');
    if (existing.some((u) => u.email === email)) {
      return { error: 'An account with this email already exists.' };
    }
    const newUser = { id: Date.now(), name, email, password, joinedAt: new Date().toISOString() };
    existing.push(newUser);
    localStorage.setItem('dd_users', JSON.stringify(existing));
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  return (
    <AppContext.Provider
      value={{ user, login, register, logout, bookings, addBooking, cancelBooking }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
