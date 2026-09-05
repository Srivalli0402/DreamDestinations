import { useState } from 'react';
import { nearbyAttractions as NEARBY_ATTRACTIONS } from '../data/nearbyAttractions';

const CATEGORY_COLORS = {
  Pilgrimage: 'bg-red-100 text-red-700',
  Nature: 'bg-green-100 text-green-700',
  Heritage: 'bg-amber-100 text-amber-700',
  Adventure: 'bg-orange-100 text-orange-700',
  Beach: 'bg-cyan-100 text-cyan-700',
  Culture: 'bg-purple-100 text-purple-700',
  Viewpoint: 'bg-blue-100 text-blue-700',
  Leisure: 'bg-teal-100 text-teal-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Wildlife: 'bg-lime-100 text-lime-700',
};

export default function NearbyAttractions({ destinationId, destinationName }) {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [mapError, setMapError] = useState(false);

  const data = NEARBY_ATTRACTIONS[destinationId];

  if (!data) return null;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${data.lng - 0.08}%2C${data.lat - 0.06}%2C${data.lng + 0.08}%2C${data.lat + 0.06}&layer=mapnik&marker=${data.lat}%2C${data.lng}`;

  return (
    <div>
      {/* Nearby Attractions section */}
      <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Nearby Attractions</h2>
      <p className="mt-1 text-sm text-gray-500">
        Explore popular attractions near {destinationName} during your trip.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {data.attractions.map((attraction, i) => {
          const isSelected = selectedAttraction === i;
          const colorClass = CATEGORY_COLORS[attraction.category] || 'bg-gray-100 text-gray-700';
          return (
            <div
              key={i}
              className={`card overflow-hidden p-4 transition-all ${
                isSelected ? 'ring-2 ring-primary-500' : 'hover:shadow-card-hover'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-gray-900">{attraction.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{attraction.description}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <svg className="h-4 w-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-sm font-semibold text-gray-700">{attraction.rating}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorClass}`}>
                  {attraction.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {attraction.distance} from center
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map section */}
      <h2 className="mt-8 font-display text-2xl font-bold text-gray-900">Location Map</h2>
      <p className="mt-1 text-sm text-gray-500">
        {destinationName} and its nearby attractions on the map.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-card">
        {!mapError ? (
          <iframe
            title={`Map of ${destinationName}`}
            src={mapUrl}
            className="h-80 w-full sm:h-96"
            loading="lazy"
            onError={() => setMapError(true)}
          />
        ) : (
          <div className="flex h-80 items-center justify-center bg-sand-50 sm:h-96">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="mt-3 text-sm font-medium text-gray-600">Map unavailable</p>
              <p className="mt-1 text-xs text-gray-400">You can still explore the attractions listed above.</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="text-gray-500">
          Showing {data.attractions.length} attractions near {destinationName}
        </p>
        <a
          href={`https://www.openstreetmap.org/?mlat=${data.lat}&mlon=${data.lng}#map=${data.zoom}/${data.lat}/${data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary-600 hover:text-primary-700"
        >
          View larger map →
        </a>
      </div>
    </div>
  );
}
