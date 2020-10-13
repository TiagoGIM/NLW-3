import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './telas/Landing';
import Orphanages from './telas/OrphanageMaps';

function Routes(){
    return (
        <BrowserRouter> 
            <Route path="/" exact component={Landing}/>
            <Route path="/app" component={Orphanages}/>
        </BrowserRouter>
    );
}
export default Routes;