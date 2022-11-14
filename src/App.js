import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

let numReserve = [];
while (numReserve.length < 16) {
  let randomNumber = Math.ceil(Math.random() * 60);
  let found = false;
  for (let i = 1; i < numReserve.length; i++) {
    if (numReserve[i] === randomNumber) {
      found = true;
      break;
    }
  }
  if (!found) {
    numReserve[numReserve.length] = randomNumber;
  }
}

function App() {
  const [cards, setCards] = useState([]);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...numReserve, ...numReserve]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card, id: Math.random(), matched: false }));

    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
  };

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.card === choiseTwo.card) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.card === choiseOne.card) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Mahjong</h1>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
