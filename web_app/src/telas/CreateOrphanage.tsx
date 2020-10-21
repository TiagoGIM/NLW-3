import React, { useState,FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {useHistory} from 'react-router-dom';
// eslint-disable-next-line
import { LeafletMouseEvent } from 'leaflet';

import {FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import happyMapIcon from  '../utils/mapIcon';
import api from "../services/api";

import '../styles/pages/create-orphanage.css';


export default function CreateOrphanage() {
  const history = useHistory();
// variaveis que vão guardar os inputs do forms
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions]=useState('');
  const [opening_hours, setOpening_hours]=useState('');
  const [position,setPosition] = useState({lat:0, lng:0});
  const [open_weekends, setOpenOnWeekend] = useState(true);
  const [images, setImages] =useState<File[]>([]);

  const [previewImgs , setPreview] =  useState<string[]>([])

  function handleMapClick(event:LeafletMouseEvent) {
        const {lat ,lng} = event.latlng
        setPosition({
          lat : lat,
          lng : lng
         })
  }
  function handleImg(event:ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      console.log('if vazio')
      return
    }
    
    const selectedImgs = Array.from(event.target.files);
    
    setImages(selectedImgs);

    const selectedImagesPreview = selectedImgs.map(img =>{
      return URL.createObjectURL(img);
    });

    setPreview(selectedImagesPreview)
  }
  async function handleSubmit(event: FormEvent) {
    const {lat, lng} = position;
    // usado para criar o MultFormData 
    const data = new FormData();
    //impede que seja enviado e mantem o que foi escrito.
    event.preventDefault();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_weekends', String(open_weekends));
    data.append('latitude', String(lat));
    data.append('longitude', String(lng));
    images.forEach(img =>{
      data.append('images',img);
    });
    //console.log(Object.fromEntries(data));
    await api.post('orphanages',data);
    alert("Orfanato cadastrado com sucesso !")
    history.push("/app"); // retorna pra origem

  }

  //imagens storage


  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.5436968,-46.6466107]} 
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onclick ={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
            {position.lat !== 0 && (
            <Marker 
            interactive={false} 
            icon={happyMapIcon} 
            position={
              [
                position.lat,
                position.lng
              ]} />
            )}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImgs.map(img =>{
                  return(
                    <img key= {img} src={img} alt={name} />
                  )
                })}
                
                <input type="file" id="files[]" onChange={handleImg}  multiple />

                <label htmlFor= "files[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              
            </div>

          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                maxLength={300}
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpening_hours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_weekends ? "active" : "" }
                onClick ={ () => setOpenOnWeekend(true) }
                >
                  Sim
                </button>
                <button 
                type="button"
                className={!open_weekends  ? "active" : "" }
                onClick ={ () => setOpenOnWeekend(false) }
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
