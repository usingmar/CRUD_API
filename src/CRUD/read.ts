import * as http from 'http'
import { User } from "../user"

export const read = async (req: http.IncomingMessage, res: http.ServerResponse, users: User[]): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        let foundedIndex = 0;
        
        let filteredUsers = users.filter((item, index) => { 
        if(req.url!.split('/')[req.url!.split('/').length - 1] == item.id){
            foundedIndex = index;
            return true;
        } 
        return false;
        })
        if(filteredUsers.length != 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(filteredUsers[0]);
            res.end();
            resolve(users);
        }
        res.statusCode = 401;
        res.write('No such user');
        res.end();
        reject(users);
    })
}