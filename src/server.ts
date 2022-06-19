import {createServer} from 'http'
import { methodManager } from './methodManager';
import { validation } from './validation';

export const serv = async () => {
    const server = createServer((req,res) => {
        let resultOfValidation = validation(req,res);
        if(!resultOfValidation){
            res.statusCode = 404;
            res.write('page is not found');
            console.log(req.method);
            res.end();
        } else methodManager(req, res, resultOfValidation);
    });
    server.listen(7000, 'localhost');
}