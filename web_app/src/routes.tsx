import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './telas/Landing';
import OrphanagesMap from './telas/OrphanageMaps';
import Orphanage from './telas/Orphanage';
import Create_orphanage from './telas/CreateOrphanage'
function Routes(){
    return (
        <BrowserRouter> 
            <Route path="/" exact component={Landing}/>
            <Route path="/app" component={OrphanagesMap}/>
            <Route path="/orphanages/:id" component={Orphanage}/>
            <Route path="/orphanages/create" exact component={Create_orphanage}/>
        </BrowserRouter>
    );
}
export default Routes;