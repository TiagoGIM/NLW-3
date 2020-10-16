import { getRepository } from 'typeorm';
import {Request,Response} from 'express'
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_views';
// import pra validação
import * as Yup from 'yup';  //* as    importar tudo, ele não tem um import all por defaut

export default{

  async index(req: Request,resp:Response){
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations:['images']
    });
    console.log(orphanages);
    return resp.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request,resp:Response){
    const { id } = req.params;
    const orphanageRepository = getRepository(Orphanage);
    console.log(id);
    const orphanage = await orphanageRepository.findOneOrFail(id,{
      relations:['images']

    });
    console.log(orphanage);
    return resp.json(orphanageView.render(orphanage));
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
      return {
        path :image.filename
      }
    });
    const data = {
      name,
      opening_hours,
      latitude,
      longetude,
      about,
      instructions,
      open_weekends,
      images
    }
//descreve quais campos são brigatorios pra o create.
    const schema = Yup.object().shape(
      {
        name:Yup.string().required(),
        opening_hours:Yup.string().required(),
        latitude:Yup.number().required(),
        longetude:Yup.number().required(),
        about:Yup.string().required().max(300),
        instructions:Yup.string().required(),
        open_weekends:Yup.boolean().required(),
        images:Yup.array(Yup.object().shape(
          {
            path:Yup.string().required()
          }
        ))
      });
    await schema.validate(data,{
      abortEarly:false,
    });
      //instancia params como um orfanato
    const orphanage = orphanageRepository.create(data);
    //como escrever no banco demora, então deixamos em await
    await orphanageRepository.save(orphanage);
    // ao criar alto o retorno 201 indica isso ao client
    return resp.status(201).json(orphanage);     
  }
};