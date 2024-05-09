import React from 'react'
import { useSocket } from './context/SocketContext';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import cardImages from './ultis/cardImport';
function Room() {
  const { socket }: any = useSocket();

  const location = useLocation();
  const { state } = location;

  console.log(state)
  const [usersConected, setUsersConected] = React.useState([]);
  const [deck, setDeck] = React.useState([]);
  const [data, setData] = React.useState('');
  const [played, setPlayed] = React.useState(false);
  const[gameStart ,setGameStart] = React.useState("");

  React.useEffect(() => {

    socket.on("setup_game", (response: any) => {
      console.log(response)
      setUsersConected(response.players)
      setDeck(response.deck)
      setData(response)
    })

    socket.on("start_game", (response:any)=>{
      console.log(response)
      setGameStart(response)
     setPlayed(true)
    })

  }, [])

  if(played){
    return <Navigate state={{gameData:gameStart, user:state}} to={`/game/tesf`} />;
  }

  function startGame(){
    socket.emit("start_game", data, ( response:any )=>{
      setGameStart(response)
    });
  }

  
  return (
    <div className='h-screen flex'>

      <div className='bg-blue-400 w-2/5 p-3'>
        <h1> CODE ROOM: {state.room}</h1>
        {usersConected?.map((el) => {
          return (
            <div className={`py-3 border-2 rounded-2xl border-gray-200 my-1 p-2 ${el.socket_id === state.socketId ? "bg-orange-400" : ""} ${el.owner ? "bg-yellow-400" : ""}`} key={el}>
              <div className="flex gap-4">
                <img className="h-12 w-12 shrink-0 rounded-lg object-cover" src={el.img_avatar} alt="" />
                <div className="flex justify-between items-center px-5 w-full">
                  <div>
                    <p className="text-gray-600 text-xs">NickName</p>
                    <p className="font-semibold text-black text-xl">{el.name}</p>
                  </div>
                  {el.owner && (
                    <span>👑</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <div className='w-4/5 flex justify-center items-center bg-[url("./assets/header_keyart__3_.avif")] bg-no-repeat bg-cover'>

        {!state.owner ? (
          <div>
            <h1 className='w-80 text-center text-4xl bg-white'>Aguarde o dono da sala iniciar a partida</h1>
          </div>
        ) : state.owner && usersConected.length > 1 ? (
          <div className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
            <button onClick={startGame} className="flex-1  font-bold text-xl bg-white px-10 py-5 rounded-full">
              INICIAR PARTIDA
            </button>
          </div>
        ) :
          (
            <div>
              <h1 className='w-80 text-center text-4xl bg-white'>Aguarde os jogadores se juntarem a voce na sala</h1>
            </div>
          )
        }
        {/* <div className='flex flex-wrap gap-5'>
          {deck.map(el => <img key={el} className='w-16' src={cardImages[el]} />)}
        </div> */}
      </div>

    </div>

  )
}

export default Room