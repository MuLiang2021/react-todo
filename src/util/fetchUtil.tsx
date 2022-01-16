export const fetchGet = (url: string):Promise<Response> =>{
    let promise: Promise<Response> = fetch(url)
    return promise
};

export const fetchDel = (url: string):Promise<Response> =>{
    let promise: Promise<Response> = fetch(url,{
        method:'delete'
    })
    return promise
};

export const fetchPostAndPut = (url: string, type: string, body: string):Promise<Response> =>{
    let promise: Promise<Response> = fetch(url,{
        method:type,
        headers:{
            'Accept':'application/json,text/plain,*/*',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:body
    })
    return promise
};