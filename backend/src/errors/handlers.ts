import {ErrorRequestHandler} from 'express';
//tratando  erros de validação
import {ValidationError} from 'yup';


//uma "view" para o error, ira descrever cada key e os erros que ela tem.
interface ValidationErrors {
    [key:string]:string[];
}

const errorHandler: ErrorRequestHandler = (error, requeste, response, next) => {
    if (error instanceof ValidationError){
        let errors: ValidationErrors = {};
        //inner é onde estão os todos os erros, este for vai percorrer cada error e deixar mais amigavel para o cliente.
        error.inner.forEach(err => {
            errors[err.path] = err.errors;            
        });
        //400 badrequest
        return response.status(400).json({message:'Validation fails',errors})
    }
    console.error(error)
    return response.status(500).json({message : 'Internal server error'})
};
export default errorHandler;