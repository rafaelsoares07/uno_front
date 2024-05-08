import { io } from 'socket.io-client';

let URL;

const isDevelopment = import.meta.env.MODE == 'development';

if(isDevelopment){
    URL = 'http://192.168.0.14:3001';
}else{
    URL="https://server-node-uno.onrender.com"
}


export const socket = io(URL);

