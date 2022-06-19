import {createServer} from 'http'
import { methodManager } from './methodManager'
import { validation } from './validation'
import { User } from './user'

let users: User[] = [];

export const serv = async () => {
    const server = createServer((req,res) => {
        let resultOfValidation = validation(req,res);
        if(resultOfValidation === undefined){
            res.statusCode = 404;
            res.write('page is not found');
            res.end();
        }
        if(resultOfValidation === ""){
            res.statusCode = 400;
            res.write('invalid data in request');
            res.end();
        }
        else methodManager(req, res, resultOfValidation, users);
    });
    server.listen(7000, "localhost", () => {
        console.log(`Server is running on http://localhost:7000`);
    });
    //res.setHeader("Content-Type", "application/json");
}