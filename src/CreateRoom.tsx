import React, { useState } from "react"
import avatar from "./assets/girl.png"
import { generateRandomCode } from "./ultis/generationCode";
import { useSocket } from "./context/SocketContext";
import { Navigate } from "react-router-dom";
import { imagesAvatar } from "./ultis/avatarImages";

function CreateRoom() {

  const { socket }: any = useSocket();
 

  const [imgAvatar, setImgAvatar] = React.useState(0)
  const [roomCreated, setRoomCreated] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [data,setData] = React.useState("");
  const [userName, setUserName] = useState("");

  function createNewRoom() {
    const codeRoom = generateRandomCode()
    socket.emit("create_room", codeRoom, userName, imagesAvatar[imgAvatar], (response:any)=>{
      // console.log(response)
      if (response.status === "OK") {
        setRoomName(codeRoom); // Armazena o nome da sala criada
        setRoomCreated(true); // Define que a sala foi criada com sucesso
        setData(response);
      }

    });
    
  }

  if (roomCreated) {
    // Se a sala foi criada com sucesso, navega para a tela do jogo passando o nome da sala como estado
    return <Navigate state={data} to={`/room/${roomName}`} />;
  }

  const handleAvatarClick = () => {
    // let randomIndex = Math.floor(Math.random() * imagesAvatar.length);
    // while(randomIndex==imgAvatar){
    //    randomIndex= Math.floor(Math.random() * imagesAvatar.length);
    // }
    // setImgAvatar(randomIndex);
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * imagesAvatar.length);
    } while (randomIndex === imgAvatar);

    setImgAvatar(randomIndex);
  };


  return (
    <div className='flex flex-col justify-center items-center h-screen w-full bg-cover bg-no-repeat bg-center bg-[url("./assets/header_keyart__3_.avif")] '>
      <div className='bg-orange-300 rounded-3xl h-3/5 w-full sm:w-3/5 p-5 mb-5 flex flex-col items-center gap-10'>

        <h1 className='text-center text-xl'>Crie um sala e compartilhe o codigo para jogar com seus amigos!</h1>

        <img onClick={handleAvatarClick} className='bg-orange-300 rounded-full w-32 h-32 cursor-pointer' src={imagesAvatar[imgAvatar]} />

        <div className="relative bg-white rounded-md">
          <input onChange={(e)=>setUserName(e.target.value)} type="text" id="username" name="username" className="text-center peer bg-transparent h-10 w-72 rounded-lg p-2" placeholder="Digite seu nome" />
        </div>

      </div>
      <button onClick={createNewRoom} className='bg-orange-500 p-5'>CRIAR SALA</button>

    </div>
  )
}

export default CreateRoom