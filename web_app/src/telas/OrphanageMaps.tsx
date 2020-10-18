import React from 'react';
import LogoMap from '../images/map-marcker.svg'
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/orphanageMaps.css';
// modulo de interação do react com maps.   
import {Map,TileLayer, Marker,Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

import 'leaflet/dist/leaflet.css'

//custom icone  

function OrphanageMaps(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={LogoMap} alt="pin happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>
                    Muitas crianças estão esperando a sua visita :)
                    </p>
                </header>
                <footer>
                    <strong>
                        São Paulo
                    </strong>
                    <p>
                        São Paulo
                    </p>
                </footer>
            </aside>
            <Map
                center={[-23.70,-46.55]}
                zoom={15}
                style={{width : '100%', height:'100%' }}
            >
                {/*<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
                <Marker
                    icon = {mapIcon}
                    position = {[-23.70,-46.55]}
                    >
                    <Popup closeButton = {false} minWidth={240} maxWidth={240} className="map-popup">
                        Texto que deveria estar verde
                        <Link to="/orphanages/1" >
                            <FiArrowRight size ={20} color = "#fff"/>
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="/orphanages/create" className="creat-home">
                <FiPlus size={32} color = "#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMaps;