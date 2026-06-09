import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Correção do bug de ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Componente para ajustar o zoom do mapa baseado nos países selecionados
function MapController({ countries }) {
  const map = useMap();

  useEffect(() => {
    if (countries && countries.length > 0) {
      const bounds = L.latLngBounds(countries.map(c => c.latlng));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5, animate: true, duration: 1.5 });
    } else {
      // Posição padrão mundial se não houver países
      map.flyTo([20, 0], 2, { animate: true, duration: 1.5 });
    }
  }, [countries, map]);

  return null;
}

export default function MapViewer({ countries, isLoading }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden h-[400px] md:h-[500px] relative shadow-lg border border-dark-border">
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-dark-bg/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
        </div>
      )}
      
      {!isLoading && countries.length === 0 && (
        <div className="absolute inset-0 z-20 bg-dark-bg/80 flex flex-col items-center justify-center text-dark-muted p-6 text-center">
          <Globe2 className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">Nenhum país encontrado ou idioma não mapeado no mapa.</p>
        </div>
      )}

      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapController countries={countries} />
        
        {countries.map((country, idx) => (
          <Marker key={`${country.cca3}-${idx}`} position={country.latlng}>
            <Popup className="dark-popup">
              <div className="text-center font-medium">
                <span className="text-2xl block mb-1">{country.flag}</span>
                {country.name.common}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Para usar o ícone do Globe2 no fallback
import { Globe2 } from 'lucide-react';
