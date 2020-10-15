import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';
import {Request,Response} from 'express'

export default{

  async index(req: Request,resp:Response){
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find();
    console.log(orphanages);
    return resp.json({lista:orphanages});
  },

  async show(req: Request,resp:Response){
    const { id } = req.params;
    const orphanageRepository = getRepository(Orphanage);
    console.log(id);
    const orphanage = await orphanageRepository.findOneOrFail(id);
    console.log(orphanage);
    return resp.json({lista:orphanage});
  },

  async create(req:Request, resp:Response) {
    const {	
      name,
      opening_hours,
      latitude,
      longetude,
      about,
      instructions,
      open_weekends,
      } = req.body;
      
    //cria repositorio com metodos de de (create, save..)
    const orphanageRepository = getRepository(Orphanage);
    //força o multer a aceitar que o files é um array.
    const reqImage = req.files as Express.Multer.File[];
    // percorre o array de images e retorna um objeto com o path
    const images = reqImage.map(image => {
      return {path :image.filename}
    })

      //instancia params como um orfanato
    const orphanage = orphanageRepository.create({
      name,
      opening_hours,
      latitude,
      longetude,
      about,
      instructions,
      open_weekends,
      images
    });
    //como escrever no banco demora, então deixamos em await
      await orphanageRepository.save(orphanage);
    // ao criar alto o retorno 201 indica isso ao client
    return resp.status(201).json({msg :'create home'});     
  }
};