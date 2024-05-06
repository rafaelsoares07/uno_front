import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cardImages from './ultis/cardImport';
import { useSocket } from './context/SocketContext';


function Game() {
    const { socket }: any = useSocket();
    const location = useLocation();
    const { state } = location;

    const [playerCards, setPlayerCards] = React.useState([]);
    const [myTurn, setMyTurn] = React.useState(false);
    const [lastCard, setLastCard] = React.useState("");
    const [gameData, setGameData] = React.useState(state.gameData);
    const [user, setUser] = React.useState(state.user) 

    console.log("==========state==========")
    console.log(state)
    console.log("==========state==========")

    console.log("==========lastCard==========")
    console.log(lastCard)
    console.log("===========lastCard==========")

    useEffect(() => {
        const myCards = state.gameData.players.filter(el => el.socket_id === state.user.socketId);
        setPlayerCards(myCards);


        socket.on("play_card", (response: any)=>{
            console.log(response)
            setLastCard(response.last_card_played)
        })

        checkMyTurn()


    }, []);


    function playCard(card:any){
        if(myTurn){
            socket.emit("play_card",state.gameData, card, (response:any)=>{
                if(response.type=="ERRO"){
                    alert(response.message)
                }
            })
        }
    }

    function checkMyTurn(){
        if(gameData.current_turn === user.socketId ){
            console.log("USUARIOOOOOO DA VEZZZ")
            setMyTurn(true)
        }
    }


    return (
        <div>
            <h1 className='text-4xl'>Game</h1>
            {myTurn && <h1 className='text-2xl'>Sua Vez de Jogar</h1>}
            <div className='flex gap-5'>
                {playerCards.length > 0 && playerCards[0].deck.map((el, index) => {
                    return <img onClick={()=>playCard(el)} key={index} className='w-14' src={cardImages[el.name]} />;
                })}
            </div>
            {lastCard && <img className='w-32' src={cardImages[lastCard.name]} />}
        </div>

    );
}

export default Game;
