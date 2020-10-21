import {Router} from 'express'
import OrphanagesControllers from './controllers/OrphanagesControllers';
// lidar com armazenamento de uploads
import multer from 'multer';
import uploadconfig from './config/upload';
//o node entende que dentro de rota tem o "app" do servidor
const routes = Router();
//configuração de armazenamento
const uploads = multer(uploadconfig);
// O padrão do controller é ter metodos: index, create, show, update e delete.
routes.get('/orphanages', OrphanagesControllers.index );
// busca individual
routes.get('/orphanages/:id', OrphanagesControllers.show );
//  cadastro de novo orfanato
routes.post('/orphanages', uploads.array('images') ,OrphanagesControllers.create );



export default routes;