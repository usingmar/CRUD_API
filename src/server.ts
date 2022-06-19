import {createServer} from 'http'
import { methodManager } from './methodManager';

export const serv = async () => {
    const server = createServer((req,res) => {
        if(req.url === '/api/users' || req.url === '/api/users/'){
            methodManager(req, res);
            console.log(req.url);
        }else{
            res.statusCode = 404;
            res.write('page is not found');
            console.log(req.method);
            res.end();
        }
    }).listen(7000, 'localhost');
}