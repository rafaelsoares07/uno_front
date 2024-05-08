import { io } from 'socket.io-client';
import dotenv from "dotenv"

dotenv.config()

let URL;

if(process.env.MODE === "DEV"){
    URL = 'http://192.168.0.14:3001';
}else{
    URL="https://api.render.com/deploy/srv-cotevv7109ks73ajorm0?key=Ba3Z-CbrrYs"
}


export const socket = io(URL);

