import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from '../assets/countries.geo.json';


const center = [5.9844, 116.0773];

export default function App() {
    const [selectedCountries, setSelectedCountries] = useState(() => {
        const savedSelections = localStorage.getItem('selectedCountries');
        return savedSelections ? JSON.parse(savedSelections) : [];
      });
    
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    localStorage.setItem('selectedCountries', JSON.stringify(selectedCountries));
  }, [selectedCountries]);

  
  const defaultStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    dashArray: 1,
    color: 'grey'
  };

  const highlightStyle = {
    fillColor: "#BD0026",
    fillOpacity: 0.7,
    weight: 2,
    opacity: 1,
    dashArray: "",
    color: "white",
  };

  const selectedStyle = {
    fillColor: "#0B6623", // A different color for selected country
    fillOpacity: 0.7,
    weight: 2,
    opacity: 1,
    dashArray: "",
    color: "white",
  };

  const onCountryClick = (e, countryId) => {
    // Function to toggle country selection
    const isSelected = selectedCountries.includes(countryId);
    const newSelectedCountries = isSelected
      ? selectedCountries.filter(id => id !== countryId) // Deselect
      : [...selectedCountries, countryId]; // Select

    setSelectedCountries(newSelectedCountries);
  
    // Add or remove marker
    const countryCenter = e.target.getBounds().getCenter();
    const newMarkers = newSelectedCountries.includes(countryId)
      ? [...markers, { id: countryId, position: [countryCenter.lat, countryCenter.lng] }]
      : markers.filter(marker => marker.id !== countryId);

    setMarkers(newMarkers);
  }
  

  return (
    
    <container>
    <div className="row justify-content-center ">
    <div className="col-md-8">
    <h1 className="my-3"><i className="bi bi-backpack me-2"><i className="bi bi-airplane me-2"></i></i>Destinations!</h1>
            

    <MapContainer className="mapContainer justify-content-center" center={center} zoom={2} style={{ width: '70vw', height: '80vh' }}>
  <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=RVNUniNLNAPXjtDx2qSi" />

  {countriesData.features.map((country, index) => {
    const isSelected = selectedCountries.includes(country.id); // Check if the country is selected
    const isMultiPolygon = country.geometry.type === 'MultiPolygon';
    let positions = isMultiPolygon
      ? country.geometry.coordinates.map(polygon => polygon[0].map(coords => [coords[1], coords[0]]))
      : country.geometry.coordinates[0].map(coords => [coords[1], coords[0]]);

    return (
      <Polygon
        key={country.id || index}
        pathOptions={isSelected ? selectedStyle : defaultStyle} // Use selectedStyle if the country is selected
        positions={positions}
        eventHandlers={{
          mouseover: (e) => e.target.setStyle(highlightStyle),
          mouseout: (e) => e.target.setStyle(isSelected ? selectedStyle : defaultStyle), // Revert to selectedStyle if the country is selected
          click: (e) => onCountryClick(e, country.id) // Toggle selection on click
        }}
      />
    );
  })}

  {markers.map(marker => (
    <Marker key={marker.id} position={marker.position}>
      <Popup>{`Country ID: ${marker.id}`}</Popup>
    </Marker>
  ))}
</MapContainer>
   
    </div>
    </div>
    </container>
    
  );
}