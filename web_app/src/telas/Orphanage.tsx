import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import api from "../services/api";

import '../styles/pages/orphanage.css';

import mapIcon from '../utils/mapIcon'

interface Orphanage {
  name:string,
  opening_hours:string,
  latitude:number,
  longitude:number,
  about:string,
  instructions:string,
  open_weekend:string,
  images:Array<{
    url :string,
    id :number,
  }>,
}
//interface para usar variaveis da rota (params)
interface OrphanParams{
  id:string,
}

export default function Orphanage() {
  const params = useParams<OrphanParams>();

//estado das imagens iniciado em 0
  const [activeImageindex, setImgIndex] = useState(0);

  const [orphanage,setOrphanage] = useState<Orphanage>();
  console.log(orphanage)
//para pegar o id preciamos do UserParamms
  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response=>{
        setOrphanage(response.data);
    })
},[params.id]); //esse ultimo [] são as infos que determinanam se precisa de um novo hook

// em quanto a api não completa o hook
if (!orphanage){
  return <p>carregando...</p>;
}

  return (
    <div id="page-orphanage">
      <Sidebar/>
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageindex].url} alt={orphanage.name} />
          <div className="images">

            {orphanage.images.map((image,index) => {
              return (
              <button 
              key = { image.id } 
              className="active" 
              type="button"
              onClick ={() => {
                setImgIndex(index)
              }}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>             
          
            )})
            }

          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about} </p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a 
                target = "_blank"
                rel = "noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_weekend ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                </div>
              )
              : (
                <div className="dont-open-on-weekends">
                  <FiInfo size={32} color="#ff669d" />
                    Não atendemos <br />
                    fim de semana
                </div>
              )
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}