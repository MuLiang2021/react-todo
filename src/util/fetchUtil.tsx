import {TODOS_URL} from '../common/constant'



export const fetchUtil = (url: string):Promise<Response>   =>{
    let promise: Promise<Response> = fetch(TODOS_URL)
    return promise

}