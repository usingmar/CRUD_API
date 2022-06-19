import * as http from 'http'
import { users } from './users'

export const methodManager = async (req: http.IncomingMessage, res: http.ServerResponse, operation: string | undefined) : Promise<void> => {
    if(operation === 'GET'){

    }
}