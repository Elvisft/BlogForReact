/**
 * Created by 刘军辉 on 2017/12/14.
 */
import { getSignIn, getToken } from './storage';
export const getURLQueryString =  (name)=> {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return r[2];
    return null;
};
const getHeaders = ()=>{
    let headers = new Headers();
    if(getSignIn()){
        headers.append('token', getToken());
    }
    return headers;
}
export const http={
    get:(url)=> {
        return fetch(url, {
                method: 'GET',
                headers: getHeaders(),
            })
    },
    post:(url, formData) =>{
        return fetch(url, {
                method: 'POST',
                headers: getHeaders(),
                body:formData,
            })
    }
}