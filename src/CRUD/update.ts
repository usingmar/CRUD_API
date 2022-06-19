import * as http from 'http'
import { User } from "../user"
import * as uuid from 'uuid'

export const update = async (req: http.IncomingMessage, res: http.ServerResponse, users: User[]): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        let receivedData: string;
        req.on("data", (chunk) => {
            receivedData += chunk;
        })
        req.on('end', () => {
            let parsedData = JSON.parse(receivedData);
            if('username' in parsedData && 'age' in parsedData && 'hobbies' in parsedData){
                let newUser = {
                    id: uuid.v4(),
                    ...parsedData
                }
                    let foundedIndex = 0;
                    let foundedUsers = users.filter((item, index) => { 
                    if(req.url!.split('/')[req.url!.split('/').length - 1] == item.id){
                        foundedIndex = index;
                        return true;
                    } 
                    return false;
                    })
                    if(foundedUsers.length != 0){
                        users[foundedIndex] = newUser
                        res.setHeader('Content-Type', 'application/json');
                        res.write(newUser);
                        res.end();
                        resolve(users);
                    }
            }
            else{
                res.statusCode = 401;
                res.end('Incorrect fieilds');
                reject(users);
            }
        })
    })
}