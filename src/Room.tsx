import React from 'react'
import { useSocket } from './context/SocketContext';
import { useParams, useLocation } from 'react-router-dom';

function Room() {
  const { socket }: any = useSocket();

  let { roomId } = useParams();
  const location = useLocation();
  const { state } = location;

  console.log(state)
  const [usersConected, setUsersConected] = React.useState([]);
  const [deck, setDeck] = React.useState([]);

  React.useEffect(() => {

    socket.on("setup_game", (response:any) => {
      console.log(response)
      setUsersConected(response.players)
      setDeck(response.deck)
    })

  }, [])


  return (
    <div className='h-screen flex iten  '>

      <div className='bg-blue-400 w-1/5 p-3'>
        {usersConected?.map((el) => {
          return (
            <div className={`py-3 border-2 rounded-2xl border-gray-200 my-1 p-2 ${el.socket_id===state.socketId?"bg-orange-400":""} ${el.owner?"bg-yellow-400":""}`} key={el}>
              <div className="flex gap-4">
                <img className="h-12 w-12 shrink-0 rounded-lg object-cover" src={el.img_avatar} alt="" />
                <div className="flex justify-between items-center px-5 w-full">
                  <div>
                  <p className="text-gray-600 text-xs">NickName</p>
                  <p className="font-semibold text-black text-xl">{el.name}</p>
                  </div>
                  {el.owner &&(
                       <span>👑</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <div className='w-3/5'>

        {state.owner && <button className='p-5 bg-orange-500'>Jogar</button>}
        {/* <div className='flex flex-wrap gap-5'>
       {deck.map(el=> <img key={el} className='w-16' src={cardImages[el]}/>)}
      </div> */}
      </div>

    </div>

  )
}

export default Room