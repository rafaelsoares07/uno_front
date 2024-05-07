import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cardImages from './ultis/cardImport';
import { useSocket } from './context/SocketContext';
import baralho from "./assets/cards-front/D4W.png"

function Game() {
    const { socket }: any = useSocket();
    const location = useLocation();
    const { state } = location;

    const [playerCards, setPlayerCards] = React.useState([]);
    const [gameData, setGameData] = React.useState(null);
    const [user, setUser] = React.useState(state.user);
    const [myTurn, setMyTurn] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(true);


    useEffect(() => {

        socket.emit("initial_game_setup", user.room, (response: any) => {
            setGameData(response)
        })

        socket.on("action_game", (response:any) => {
            console.log(response)
            setGameData(response)
        })

    }, []);

    useEffect(() => {

        if (gameData ) {
            setCardsToPlayer()
            checkMyTurn()
        }

    }, [gameData]);


    function pickCart() {
        if (myTurn) {
            socket.emit("pick_card", gameData)
            setIsDragging(false)
        } else {
            alert("Aguarde sua vez de jogar!")
        }
    }

    function playCard(card: any) {
        if (myTurn) {
            socket.emit("play_card", gameData, card, (response: any) => {
                if (response.type == "ERRO") {
                    //se deu erro nao atualizou turno para o proximo jogador
                    alert(response.message)
                } else {
                    console.log(playerCards)
                    //nao e mais seu turno
                    setMyTurn(false)
                    setIsDragging(false)
                }
            })
        } else {
            alert("Aguarde sua vez de jogar!")
        }
    }

    function setCardsToPlayer() {
        const player = gameData.players.filter((el, index) => {
            return el.socket_id === user.socketId
        })
        setPlayerCards(player[0].deck)
    }

    function checkMyTurn() {
        
        if (gameData.current_turn === user.socketId ) {
            console.log("MEU TURNO")
            setMyTurn(true)
            setIsDragging(true)
        } else {
            console.log("NAO E MEU TURNO")
            setMyTurn(false)
            setIsDragging(false)
        }
    }


    console.log(isDragging)

    return (
        <div>
            <h1 className='text-4xl'>Game</h1>
            {myTurn ? <p>Sua vez de jogar</p> : <p>Aguarde sua vez jogar</p>}
            <div className='flex gap-5'>
                {playerCards?.length > 0 && playerCards.map((el, index) => {
                    return <img onClick={() => playCard(el)} key={index} className='w-14' src={cardImages[el.name]} />;
                })}
            </div>
            {gameData?.last_card_played != null ? <img className='w-32' src={cardImages[gameData?.last_card_played.name]} /> : <p>Nao jogou ainda</p>}


            {isDragging && myTurn ? (
                <button onClick={pickCart} className='bg-green-500 p-2'>Puxar Carta</button>
            ) : (
                null
            )}


        </div>

    );
}

export default Game;
