import {Route, Routes } from 'react-router-dom';
import Home from './Home';
import{ SocketContext } from './context/SocketContext';
import { socket } from './services/socket';
import "./index.css"
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Room from './Room';
import Game from './Game';


const App = () => {
  socket.on("connect", () =>{
    console.log("conectou aop servidor socket io")
  })
  return (
    <SocketContext.Provider value={{socket}}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createRoom" element={<CreateRoom />} />
      <Route path="/joinRoom" element={<JoinRoom />} />
      <Route path='/room/:roomId' element={<Room/>}></Route>
      <Route path='/game/:gameRoom' element={<Game/>}></Route>
    </Routes>
    </SocketContext.Provider>
    
  );
};

export default App;
