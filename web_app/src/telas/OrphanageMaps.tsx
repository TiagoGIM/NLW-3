import React from 'react';
import LogoMap from '../images/map-marcker.svg'
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import '../styles/pages/orphanageMaps.css';
import {Map,TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

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
                center={[-23.6173703,-46.6415725]}
                zoom={15}
                style={{width : '100%', height:'100%' }}
            >
                {/*<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>
            <Link to="/" className="creat-home">
                <FiPlus size={32} color = "#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMaps;