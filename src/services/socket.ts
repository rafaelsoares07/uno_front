import { io } from 'socket.io-client';

let URL;

const isDevelopment = import.meta.env.MODE === 'DEV';

if(isDevelopment){
    URL = 'http://192.168.0.14:3001';
}else{
    URL="https://api.render.com/deploy/srv-cotevv7109ks73ajorm0?key=Ba3Z-CbrrYs"
}


export const socket = io(URL);

