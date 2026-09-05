import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { packages, destinations } from '../data/tourismData';
import PackageCard from '../components/PackageCard';

const TRAVEL_TYPES = ['Family', 'Adventure', 'Religious', 'Honeymoon', 'Beach', 'Nature', 'Cultural', 'Heritage'];
const INTERESTS = ['Sightseeing', 'Trekking', 'Beaches', 'Temples', 'Wildlife', 'Shopping', 'Photography', 'Adventure', 'Nature', 'Cultural experiences'];

const BUDGET_RANGES = [
  { id: 'all', label: 'All Budgets', min: 0, max: Infinity },
  { id: 'budget', label: 'Under ₹8,000', min: 0, max: 7999 },
  { id: 'mid', label: '₹8,000 – ₹12,000', min: 8000, max: 12000 },
  { id: 'premium', label: '₹12,000 – ₹16,000', min: 12001, max: 16000 },
  { id: 'luxury', label: 'Above ₹16,000', min: 16001, max: Infinity },
];

const DURATION_OPTIONS = [
  { id: 'all', label: 'Any Duration', min: 0, max: Infinity },
  { id: 'short', label: '1–3 Days', min: 1, max: 3 },
  { id: 'medium', label: '4–5 Days', min: 4, max: 5 },
  { id: 'long', label: '6+ Days', min: 6, max: Infinity },
];

const RATING_OPTIONS = [
  { id: 0, label: 'Any Rating' },
  { id: 4.5, label: '4.5+ Stars' },
  { id: 4.7, label: '4.7+ Stars' },
  { id: 4.8, label: '4.8+ Stars' },
];

const TAG_TO_TRAVEL_TYPES = {
  Pilgrimage: ['Religious', 'Cultural'],
  Nature: ['Nature', 'Family'],
  Heritage: ['Heritage', 'Cultural'],
  Adventure: ['Adventure'],
  'Hill Station': ['Nature', 'Family'],
  Beach: ['Beach', 'Family'],
  Spiritual: ['Religious', 'Cultural'],
};

const ACTIVITY_KEYWORD_MAP = [
  { keywords: ['temple', 'darshan', 'aarti', 'ashram', 'monastery', 'spiritual'], interest: 'Temples' },
  { keywords: ['trek', 'trekking', 'hiking', 'hill trek'], interest: 'Trekking' },
  { keywords: ['beach', 'swimming', 'surfing', 'beach hopping'], interest: 'Beaches' },
  { keywords: ['monument', 'fort', 'palace', 'sightseeing', 'tour', 'museum'], interest: 'Sightseeing' },
  { keywords: ['wildlife', 'national park', 'sanctuary', 'zoo'], interest: 'Wildlife' },
  { keywords: ['shopping', 'bazaar', 'market'], interest: 'Shopping' },
  { keywords: ['photography', 'sunrise', 'sunset', 'viewpoint'], interest: 'Photography' },
  { keywords: ['skiing', 'paragliding', 'rafting', 'adventure', 'water sports', 'camel'], interest: 'Adventure' },
  { keywords: ['tea', 'plantation', 'garden', 'forest', 'nature', 'lake', 'waterfall', 'hill'], interest: 'Nature' },
  { keywords: ['cultural', 'heritage', 'kathakali', 'tribal', 'weaving', 'cuisine', 'french'], interest: 'Cultural experiences' },
];

function getTravelTypes(pkg) {
  const types = new Set(TAG_TO_TRAVEL_TYPES[pkg.tag] || []);
  const activityText = (pkg.activities || []).join(' ').toLowerCase();
  if (/(beach|swim|surf)/.test(activityText)) types.add('Beach');
  if (/(trek|ski|paraglid|raft|adventure)/.test(activityText)) types.add('Adventure');
  if (/(temple|darshan|aarti|spiritual|ashram|monastery)/.test(activityText)) types.add('Religious');
  if (/(heritage|palace|fort|monument|cultural|museum)/.test(activityText)) types.add('Cultural');
  if (/(nature|tea|garden|forest|lake|waterfall|hill)/.test(activityText)) types.add('Nature');
  return [...types];
}

function getInterests(pkg) {
  const interests = new Set();
  const activityText = (pkg.activities || []).join(' ').toLowerCase();
  const attractionText = (pkg.popularAttractions || []).join(' ').toLowerCase();
  const fullText = `${activityText} ${attractionText} ${pkg.description.toLowerCase()}`;
  for (const { keywords, interest } of ACTIVITY_KEYWORD_MAP) {
    if (keywords.some((kw) => fullText.includes(kw))) {
      interests.add(interest);
    }
  }
  return [...interests];
}

const packageMeta = packages.map((p) => ({
  id: p.id,
  travelTypes: getTravelTypes(p),
  interests: getInterests(p),
  durationDays: parseInt(p.duration.match(/(\d+)\s+Days/)?.[1] || '0', 10),
}));

function parseDurationDays(durationStr) {
  return parseInt(durationStr.match(/(\d+)\s+Days/)?.[1] || '0', 10);
}

export default function Packages() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase();

  const [search, setSearch] = useState(query);
  const [sort, setSort] = useState('popular');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [selectedTravelTypes, setSelectedTravelTypes] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleTravelType = (type) => {
    setSelectedTravelTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedDestination('all');
    setBudgetRange('all');
    setDurationFilter('all');
    setMinRating(0);
    setSelectedTravelTypes([]);
    setSelectedInterests([]);
  };

  const hasActiveFilters =
    selectedDestination !== 'all' ||
    budgetRange !== 'all' ||
    durationFilter !== 'all' ||
    minRating > 0 ||
    selectedTravelTypes.length > 0 ||
    selectedInterests.length > 0 ||
    search !== '';

  const filtered = useMemo(() => {
    let result = packages;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedDestination !== 'all') {
      result = result.filter((p) => p.destinationId === selectedDestination);
    }

    const budget = BUDGET_RANGES.find((b) => b.id === budgetRange);
    if (budget && budget.id !== 'all') {
      result = result.filter((p) => p.price >= budget.min && p.price <= budget.max);
    }

    const dur = DURATION_OPTIONS.find((d) => d.id === durationFilter);
    if (dur && dur.id !== 'all') {
      result = result.filter((p) => {
        const days = parseDurationDays(p.duration);
        return days >= dur.min && days <= dur.max;
      });
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (selectedTravelTypes.length > 0) {
      result = result.filter((p) => {
        const meta = packageMeta.find((m) => m.id === p.id);
        return meta && selectedTravelTypes.some((t) => meta.travelTypes.includes(t));
      });
    }

    if (selectedInterests.length > 0) {
      result = result.filter((p) => {
        const meta = packageMeta.find((m) => m.id === p.id);
        return meta && selectedInterests.some((i) => meta.interests.includes(i));
      });
    }

    switch (sort) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [search, sort, selectedDestination, budgetRange, durationFilter, minRating, selectedTravelTypes, selectedInterests]);

  const activeFilterCount =
    (selectedDestination !== 'all' ? 1 : 0) +
    (budgetRange !== 'all' ? 1 : 0) +
    (durationFilter !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedTravelTypes.length +
    selectedInterests.length;

  return (
    <div>
      {/* Page header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-center text-white">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Travel Packages</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Discover our handpicked collection of unforgettable travel experiences across India.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search & sort bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations or packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="btn-outline lg:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-auto">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filter sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-72 lg:flex-shrink-0`}>
            <div className="card sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Destination filter */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Destination</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Destinations</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Budget filter */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Budget Range</label>
                <div className="space-y-1.5">
                  {BUDGET_RANGES.map((b) => (
                    <label key={b.id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="budget"
                        value={b.id}
                        checked={budgetRange === b.id}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="h-4 w-4 accent-primary-600"
                      />
                      {b.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration filter */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Trip Duration</label>
                <div className="space-y-1.5">
                  {DURATION_OPTIONS.map((d) => (
                    <label key={d.id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="duration"
                        value={d.id}
                        checked={durationFilter === d.id}
                        onChange={(e) => setDurationFilter(e.target.value)}
                        className="h-4 w-4 accent-primary-600"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating filter */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Minimum Rating</label>
                <div className="space-y-1.5">
                  {RATING_OPTIONS.map((r) => (
                    <label key={r.id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="rating"
                        value={r.id}
                        checked={minRating === r.id}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        className="h-4 w-4 accent-primary-600"
                      />
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel type filter */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Travel Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {TRAVEL_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleTravelType(type)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedTravelTypes.includes(type)
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities / interests filter */}
              <div className="mb-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">Activities / Interests</label>
                <div className="flex flex-wrap gap-1.5">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-accent-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filtered.length} package{filtered.length !== 1 ? 's' : ''} found
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-primary-600 transition-colors hover:text-primary-700 lg:hidden"
                >
                  Clear All Filters ({activeFilterCount})
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900">No packages match your filters</h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Try adjusting or clearing some filters to see more travel packages across India.
                </p>
                <button onClick={clearAllFilters} className="btn-primary mt-6">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
