import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cardImages from './ultis/cardImport';
import { useSocket } from './context/SocketContext';
import playCardAudio from "./assets/audio/play_card.mp3"
import pickCardAudio from "./assets/audio/pick_card.mp3"
import wildCardAudio from "./assets/audio/suspense_wild_card.mp3"
import cardBack from "./assets/assets/card-back.png"
import Modal from './SpecialCardModal'

function Game() {
    const { socket }: any = useSocket();
    const location = useLocation();
    const { state } = location;

    const [playerCards, setPlayerCards] = React.useState([]);
    const [gameData, setGameData] = React.useState(null);
    const [user, setUser] = React.useState(state.user);
    const [myTurn, setMyTurn] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [iCanPassTurn, setICanPassTurn] = React.useState(false)

    useEffect(() => {


        socket.emit("initial_game_setup", user.room, (gameData: any) => {
            setGameData(gameData)
        })

        socket.on("action_game_play_card", (gameData: any) => {
            // console.log(gameData)
            setGameData(gameData)

            const snd = new Audio(playCardAudio);
            snd.play();
           

        })

        socket.on("action_game_drag_card", (gameData: any) => {
            // console.log(gameData)
            setGameData(gameData)
            const snd = new Audio(pickCardAudio);
            snd.play();
        })

    }, []);

    useEffect(() => {

        if (gameData) {
            setCardsToPlayer()
            checkMyTurn()
        }

        if (gameData) {
            // console.log(true)
        }

        console.log(gameData)

    }, [gameData]);


    function pickCart() {
        if (myTurn) {

            socket.emit("pick_card", gameData, (callbak: any) => {
                // console.log(callbak)
                setPlayerCards(callbak)
                const snd = new Audio(pickCardAudio);
                snd.play();
            })
            setIsDragging(false)
        } else {
            alert("Aguarde sua vez de jogar!")
        }
    }

    function playCard(card: any) {

        let newCard = card

        if (card.type === "Wild Card") {
            let foo = prompt('Escolha uma cor: G (Green), B(Blue), Y(Yellow) ou R(Red)');
            let bar = confirm('Confirm or deny');
            // console.log(foo) 
            // console.log(bar)
            newCard.color = foo
        }

        if (myTurn) {

            socket.emit("play_card", gameData, newCard, (response: any) => {
                if (response.type == "ERRO") {
                    //se deu erro nao atualizou turno para o proximo jogador
                    alert(response.message)
                } else {
                    // console.log(playerCards)
                    //nao e mais seu turno
                    setMyTurn(false)
                    setIsDragging(false)
                    setICanPassTurn(false)
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

        if (gameData.current_turn === user.socketId) {
            // console.log("MEU TURNO")
            setMyTurn(true)
            setIsDragging(true)
            setICanPassTurn(true)
        } else {
            // console.log("NAO E MEU TURNO")
            setMyTurn(false)

        }
    }

    function passTheTurn() {
        if (myTurn) {
            socket.emit("pass_turn", gameData, (response: any) => {
                // console.log(response)
                setMyTurn(false)
                setIsDragging(false)
                setICanPassTurn(false)
            })
        }
    }



    return (
        <div>

            <Modal playerCards={playerCards} gameData={gameData} playCard={playCard}/>

            {gameData?.players.filter(el => el.socket_id != user.socketId).map((el, index) => {
                return (
                    <div key={el}>
                        <p>{el.name}</p>
                        <img className='w-10' src={el.img_avatar} alt="" srcset="" />
                        <div className='flex'>
                            {el.deck.map(el => <img className='w-10' src={cardBack} />)}
                            {el.deck.length} Cartas restantes
                        </div>
                    </div>

                )
            })}

            <h1 className='text-4xl'>Game</h1>
            {myTurn ? <p>Sua vez de jogar</p> : <p>Aguarde sua vez jogar</p>}
            <div className='flex gap-5'>
                {playerCards?.length > 0 && playerCards.map((el, index) => {
                    return <img onClick={() => playCard(el)} onDoubleClick={() => playCard(el)} key={index} className='w-14 cursor-pointer' src={cardImages[el.name]} />;
                })}
            </div>


            <div className='flex justify-center w-64 h-80 bg-slate-500 p-4  relative p-5'>
                {
                    gameData?.deck_discard?.map((el, index) => {
                        if (index % 2 === 0) {
                            return (
                                <img key={index} className='w-32 -rotate-12 absolute' src={cardImages[el.name]} alt={el.name} />
                            );
                        }
                        else if (index % 3 === 0) {
                            return (
                                <img key={index} className='w-32 rotate-0 absolute' src={cardImages[el.name]} alt={el.name} />
                            );
                        }
                        else {
                            return (
                                <img key={index} className='w-32 rotate-12 absolute' src={cardImages[el.name]} alt={el.name} />
                            );
                        }

                    })
                }
            </div>
            {/* {gameData?.last_card_played != null ? <img className='w-32' src={cardImages[gameData?.last_card_played.name]} /> : <p>Nao jogou ainda</p>} */}


            {isDragging && myTurn ? (
                <button onClick={pickCart} className='bg-green-500 p-2'>Puxar Carta</button>
            ) : (
                null
            )}

            {!isDragging && myTurn && iCanPassTurn ? (
                <button onClick={passTheTurn} className='bg-blue-600 p-2'>Passar a vez</button>
            ) : (
                null
            )}


        </div>

    );
}

export default Game;
