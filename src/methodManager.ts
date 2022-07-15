import * as http from 'http'
import { create } from './CRUD/create';
import { remove } from './CRUD/delete';
import { read } from './CRUD/read';
import { update } from './CRUD/update';
import { User } from './user';

export const methodManager = async (req: http.IncomingMessage, res: http.ServerResponse, operation: string | undefined, users: User[]) : Promise<User[]> => {
    switch(operation){
        case "POST": return await (create(req, res, users))
        case "PUT":  return await update(req, res, users)
        case "DELETE": return await remove(req, res, users)
        case "GET": return await read(req, res, users);
        default: return new Promise<User[]>((reject) => reject(users));
    }
}