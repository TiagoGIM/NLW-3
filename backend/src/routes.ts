import {Router} from 'express'
import OrphanagesControllers from './controllers/OrphanagesControllers';

//o node entende que dentro de rota tem o "app" do servidor
const routes = Router();

routes.post('/orphanages', OrphanagesControllers.create );


export default routes;