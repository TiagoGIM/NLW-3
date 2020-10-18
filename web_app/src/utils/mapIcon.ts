import mapImg from '../images/map-marcker.svg';
import L from 'leaflet';

const MapIcon = L.icon({
  iconUrl: mapImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})
 export default MapIcon;