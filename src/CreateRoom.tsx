import React, { useState } from "react"
import { generateRandomCode } from "./ultis/generationCode";
import { useSocket } from "./context/SocketContext";
import { Navigate } from "react-router-dom";
import { imagesAvatar } from "./ultis/avatarImages";
import { toggleFullscreen } from "./ultis/fullScreen";

function CreateRoom() {

  const { socket }: any = useSocket();


  const [imgAvatar, setImgAvatar] = React.useState(0)
  const [roomCreated, setRoomCreated] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [data, setData] = React.useState("");
  const [userName, setUserName] = useState("");

  function createNewRoom() {
    const codeRoom = generateRandomCode()
    socket.emit("create_room", codeRoom, userName, imagesAvatar[imgAvatar], (response: any) => {
      // console.log(response)
      if (response.status === "OK") {
        setRoomName(codeRoom); // Armazena o nome da sala criada
        setRoomCreated(true); // Define que a sala foi criada com sucesso
        setData(response);
      }

    });
toggleFullscreen()
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
      <div className='bg-orange-300 rounded-3xl  w-full sm:w-3/5 p-5  flex flex-col items-center gap-5 m-5 '>

        <h1 className='text-center text-xl'>Crie um sala e compartilhe o codigo gerado para jogar e se divertir com seus amigos!</h1>

        <img onClick={handleAvatarClick} className='bg-orange-300 rounded-full w-24 h-24  cursor-pointer' src={imagesAvatar[imgAvatar]} />

        <div className="relative bg-white rounded-md">
          <input onChange={(e) => setUserName(e.target.value)} type="text" id="username" name="username" className="text-center peer bg-transparent h-10 w-72 rounded-lg p-2" placeholder="Digite seu nome" />
        </div>

        <div onClick={createNewRoom} className="flex bg-verde px-3 py-2 hover:-translate-y-1 hover:scale-95">
          <button className="flex-1 font-outline-2 font-bold text-white stroke-2 font-lilita text-xl lg:text-2xl text-outline px-6 py-1 ">
            CRIAR SALA
          </button>
        </div>
      </div>


    </div>
  )
}

export default CreateRoom