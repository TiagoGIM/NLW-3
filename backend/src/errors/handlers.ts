import {ErrorRequestHandler} from 'express';

const errorHandler: ErrorRequestHandler = (error, requeste, response, next) => {
    console.error(error);

    return response.status(500).json({message : 'Internal server error'})
};
export default errorHandler;