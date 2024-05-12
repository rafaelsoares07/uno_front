import Modal from 'react-modal'
import cardImages from './ultis/cardImport';
import React from 'react';
import { useSocket } from './context/SocketContext';

const SpecialCardModal = ({ playerCards, gameData, playCard}) => {

    const { socket }: any = useSocket();

    const [openModal, setOpenModal] = React.useState(false)
    const [haveResponse, setHaveResponse] = React.useState([])
    const [cardsReciver, setCardsReciver] = React.useState(null)

    React.useEffect(() => {

        socket.on("reciver_special_card", (response: any) => {
            console.log(response)
            setOpenModal(true)
            setCardsReciver(response)
        })

        const cardsResponse = playerCards.filter(el => el.value == cardsReciver.type)

        if (cardsResponse) {
            setHaveResponse(cardsResponse)
        }

    }, [openModal])

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    function playResposeCard(card:any){
        playCard(card)
        setOpenModal(false)
    }
    

    function pickAllCards() {
        socket.emit("pick_all_cards", gameData, (response: any) => {
            console.log(response)
            setOpenModal(false)

            socket.emit("pass_turn", gameData, (response: any) => {
                console.log(response)
            })
        })
    }

    return (
        <Modal className="h-full flex flex-col justify-center items-center" isOpen={openModal} contentLabel="Special Card Modal">
            <button onClick={handleCloseModal}>Fechar</button> {/* Botão para fechar o modal */}
            {cardsReciver ?
                (
                    <div>
                        <p>A quantidade acumulada dessa carta e: {cardsReciver.quantity.length}</p>
                        <div className='flex'>
                            {cardsReciver.quantity.map((el,index) => <img key={index} className='w-24' src={cardImages[el.name]} alt={el.name} />)}
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <p>Testsasndo</p>
                    </div>
                )
            }

            {haveResponse.length > 0 ?
                (
                    <div>
                        <p>Você pode responder usando uma dessas suas cartas</p>
                        <div className='flex'>
                            {haveResponse.map((el, index) => {
                                return (
                                    <img onClick={() => playResposeCard(el)} onDoubleClick={() => playResposeCard(el)} key={index} className='w-14 cursor-pointer' src={cardImages[el.name]} />
                                )
                            })}
                        </div>
                        <p>Ou</p>
                        <button type="button" onClick={pickAllCards}>Comprar Cartas</button>
                    </div>

                ) :
                (
                    <div>
                        <p>Você não tem resposta</p>
                        <button type="button" onClick={pickAllCards}>Comprar Cartas</button>
                    </div>

                )
            }

        </Modal>

    );
};

export default SpecialCardModal;
