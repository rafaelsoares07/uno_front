
import { Navigate } from "react-router-dom";
import { toggleFullscreen } from './ultis/fullScreen';
import React, { useEffect } from "react";

function Home() {
  const [redirectCreateRoom, setRedirectCreateRoom] = React.useState(false);
  const [redirectJoinRoom, setRedirectJoinRoom] = React.useState(false); 

  useEffect(()=>{
    if(window.innerHeight>innerWidth){
      alert("PARA UMA MELHORE EXPERIENCIA VIRE O CELULAR PARA O MODO PAISAGEM")
    }
  },[])
  
  function goToCreateRoom(){
    toggleFullscreen()
    setRedirectCreateRoom(true)
  }

  function goToJoinRoom(){
    toggleFullscreen()
    setRedirectJoinRoom(true)

  }

  if (redirectCreateRoom) {
    return <Navigate to="/createRoom" />;
  }

  if(redirectJoinRoom){
    return <Navigate to="/joinRoom" />;

  }

  return (
    <div className='flex justify-center items-center h-screen w-full bg-cover bg-no-repeat bg-center bg-[url("./assets/header_keyart__3_.avif")] '>
      <div>
        <div className='flex flex-col justify-around gap-5'>
            <div onClick={goToCreateRoom} className="flex bg-amarelo px-3 py-2 hover:scale-95">
              <button className="flex-1 font-outline-2 font-bold text-white stroke-2   font-lilita text-4xl lg:text-5xl text-outline px-6 py-1  ">
                CRIAR SALA
              </button>
            </div>

          <div onClick={goToJoinRoom} className="flex bg-verde px-3 py-2 hover:-translate-y-1 hover:scale-95">
              <button className="flex-1 font-outline-2 font-bold text-white stroke-2  font-lilita text-4xl lg:text-5xl text-outline px-6 py-1 ">
                ENTRAR EM SALA
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
