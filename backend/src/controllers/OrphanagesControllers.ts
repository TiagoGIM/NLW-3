import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';
import {Request,Response} from 'express'

export default{
  async create(req:Request, resp:Response) {
    const {	
      name,
      opening_hours,
      latitude,
      longetude,
      about,
      instructions,
      open_weekends
      } = req.body;
      
    //cria repositorio com metodos de de (create, save..)
    const orfanageRepository = getRepository(Orphanage);
      //instancia params como um orfanato
    const orphanage = orfanageRepository.create({
      name,
      opening_hours,
      latitude,
      longetude,
      about,
      instructions,
      open_weekends,
    });
    //como escrever no banco demora, então deixamos em await
      await orfanageRepository.save(orphanage);
    // ao criar alto o retorno 201 indica isso ao client
    return resp.status(201).json({msg :'create home'});     
  }
};