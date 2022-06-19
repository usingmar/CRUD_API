import * as http from 'http'
import * as uuid from 'uuid'

const checkGET = (url: string): Boolean => {
    if(url === "/api/users" || url === "/api/users/" ) return true;
    if(url.indexOf("/api/users") == 0 && uuid.validate(url.split('/')[url.split('/').length - 1])) return true;
    return false
}

const checkPutOrDelete = (url: string): Boolean => {
    if(uuid.validate(url.split('/')[url.split('/').length - 1])) return true;
    return false
}

const checkPOST = (url: string): Boolean => {
    if(url === "/api/users" || url === "/api/users/") return true;
    return false;
}

const validators = [
    {operation: "GET", check: checkGET},
    {operation: "PUT", check: checkPutOrDelete},
    {operation: "DELETE", check: checkPutOrDelete},
    {operation: "POST", check: checkPOST}
]

const validateInput = (url: string, method: string): Object[] => {
    return validators.filter((item) => {
    if(item.operation === url) return !item.check(url);
    return true;
})}

export const validation = (req: http.IncomingMessage, res: http.ServerResponse): (string | undefined) => {
    if(req.url!.indexOf('/api/users') != 0) return undefined;
    if(validateInput.length == 0) return req.method;
}