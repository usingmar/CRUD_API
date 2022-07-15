import * as http from 'http'
import { User } from "../user"
import * as uuid from "uuid"

export const remove = (req: http.IncomingMessage, res: http.ServerResponse, users: User[]): Promise<User[]> => {
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
        resolve(users.splice(foundedIndex, 1));
    }
    reject(users);
});
}