import React, { useEffect, useState } from 'react';
import LogoMap from '../images/map-marcker.svg'
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/orphanageMaps.css';
// modulo de interação do react com maps.   
import {Map,TileLayer, Marker,Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';
//para facilitar a conversa com o back
interface Orphanage {
  name:string,
  id:number,
  opening_hours:string,
  latitude:number,
  longitude:number,
  about:string,
  instructions:string,
  open_weekend:string,
  images:[]
}

//custom icone  

function OrphanageMaps(){
    //similar a tupla de python, são dois retornos o primeiro um array com as infos
    // e o segundo um metodo para edita-los.
    //<interface>  indica o tipo de dado que se espera
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
    console.log(orphanages);

    useEffect(() => {
        api.get('orphanages').then(response=>{
            setOrphanages(response.data);
        })

    },[]);
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
                
                center={[-23.5436968,-46.6466107]}
                zoom={13}
                style={{width : '100%', height:'100%' }}
            >
                {/*<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
                {orphanages.map(orphanage => {
                  return(
                  <Marker
                    icon = {mapIcon}
                    position = {[orphanage.latitude,orphanage.longitude]}
                    key = {orphanage.id}
                    >
                    <Popup closeButton = {false} minWidth={240} maxWidth={240} className="map-popup">
                      {orphanage.name}
                      <Link to={`/orphanages/${orphanage.id}`} >
                          <FiArrowRight size ={20} color = "#fff"/>
                      </Link>
                    </Popup>
                  </Marker>
                  )
                })};
            </Map>

            <Link to="orphanages/create" className="creat-home">
                <FiPlus size={32} color = "#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMaps;