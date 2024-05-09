import React from "react"
import avatar from "./assets/girl.png"
import { Navigate } from "react-router-dom";
import { useSocket } from "./context/SocketContext";
import { imagesAvatar } from "./ultis/avatarImages";
import refreshIcon from "./assets/dice.png"

function JoinRoom() {



  const { socket }: any = useSocket();

  const [imgAvatar, setImgAvatar] = React.useState(0)
  const [roomJoined, setRoomJoined] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [codeRoom, setCodeRoom] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [data, setData] = React.useState("");

  function joinNewRoom() {
    socket.emit("join_room", codeRoom, userName, imagesAvatar[imgAvatar], (response: any) => {
      // console.log(response)
      if (response.status === "OK") {
        setRoomName(codeRoom); // Armazena o nome da sala criada
        setRoomJoined(true); // Define que a sala foi criada com sucesso
        setData(response);
      }
      else if (response.status === "ERRO") {
        alert(response.message)
      }
    });
  }

  if (roomJoined) {
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

        <h1 className='text-center text-xl'>Escolha seu avatar e coloque o codigo da sala para se divertir!</h1>

        <div className="flex justify-center items-center gap-5">
          <div className="relative">
            <img onClick={handleAvatarClick}  src={refreshIcon} className="w-10 absolute bottom-0 -right-1 cursor-pointer" />
            <img className='bg-orange-300 rounded-full w-24 h-24 cursor-pointer' src={imagesAvatar[imgAvatar]} />
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative bg-white rounded-md">
              <input onChange={(e) => setCodeRoom(e.target.value)} type="text" id="username" name="username" className="text-center peer bg-transparent h-10 w-72 rounded-lg p-2" placeholder="Digite o codigo" />

            </div>
            <div className="relative bg-white rounded-md">
              <input onChange={(e) => setUserName(e.target.value)} type="text" id="usernames" name="usernames" className="text-center peer bg-transparent h-10 w-72 rounded-lg p-2" placeholder="Digite seu Nome" />

            </div>
          </div>

        </div>


        <div onClick={joinNewRoom} className="flex bg-verde px-3 py-2 hover:-translate-y-1 hover:scale-95">
          <button className="flex-1 font-outline-2 font-bold text-white stroke-2 font-lilita text-xl lg:text-2xl text-outline px-6 py-1 ">
            ENTRAR NA SALA
          </button>
        </div>

      </div>

    </div>
  )
}

export default JoinRoom