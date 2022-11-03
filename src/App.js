import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

let numReserve = [];
while (numReserve.length < 16) {
  let randomNumber = Math.ceil(Math.random() * 60);
  let found = false;
  for (let i = 1; i < numReserve.length; i++) {
  if (numReserve[i] === randomNumber){
   found = true;
   break;
  }
  }
  if (!found) { numReserve[numReserve.length]=randomNumber; }
}

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...numReserve, ...numReserve]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({card, id:Math.random(), matched: false}));

    setChoiseOne(null)
    setChoiseTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true)
      if(choiseOne.card === choiseTwo.card) {
        console.log('those cards match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.card === choiseOne.card) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log('those cards do not match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiseOne, choiseTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1 className="title">Mahjong-like game</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoise={handleChoise}
          flipped={card === choiseOne || card === choiseTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
          <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
