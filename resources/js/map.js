import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function initMap() {
    const map = L.map('map').setView([19.4326, -99.1332], 13); // CDMX

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
    }).addTo(map);

    L.marker([19.4326, -99.1332]).addTo(map).bindPopup('Hola desde CDMX');
}