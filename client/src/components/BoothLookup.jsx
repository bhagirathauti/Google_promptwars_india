import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Navigation, Clock, Search, AlertCircle } from 'lucide-react';
import axios from 'axios';
import useStore from '../store/useStore';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const BoothLookup = () => {
  const { userData, updateUserData } = useStore();
  const [pincode, setPincode] = useState('');
  const [booth, setBooth] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const handleSearch = async () => {
    if (!pincode) return;
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || '/api'}/booth-lookup?pincode=${pincode}`);
      setBooth(res.data);
      updateUserData({ boothId: res.data.id });
    } catch (err) {
      setError(err.response?.data?.error || "Booth not found. Try 110027, 400706, or 560002.");
      setBooth(null);
    } finally {
      setIsLoading(false);
    }
  };

  const center = booth ? { lat: booth.lat, lng: booth.lng } : { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode (e.g. 110027)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-primary-600 text-white px-6 rounded-xl font-bold hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? '...' : 'Find'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {booth && (
        <div className="material-card overflow-hidden border border-slate-100">
          <div className="relative">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            ) : (
              <div className="bg-slate-100 w-full h-[300px] flex flex-col items-center justify-center text-slate-400 gap-2">
                <MapPin size={48} className="opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">Map View (API Key Required)</p>
                <p className="text-[10px] text-slate-400">Mocking location: {booth.lat}, {booth.lng}</p>
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm text-[10px] font-bold text-primary-600 flex items-center gap-1">
              <Navigation size={12} />
              {Math.floor(Math.random() * 5) + 1} km away
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{booth.name}</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {booth.address}
              </p>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Timing</div>
                  <div className="text-xs font-bold text-slate-700">{booth.timing}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Booth ID</div>
                  <div className="text-xs font-bold text-slate-700">{booth.id}</div>
                </div>
              </div>
            </div>

            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
            >
              <Navigation size={16} /> Get Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoothLookup;
