import { io } from 'socket.io-client';

const URL = 'http://192.168.0.14:3001';

export const socket = io(URL);

