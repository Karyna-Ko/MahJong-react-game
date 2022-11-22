import { useEffect, useState } from 'react';

import SingleCard from './components/SingleCard';
import { IPropsCard } from './utils/interfaces';
import { shuffledCards, primeNumbers } from './utils/shuffledCards';

function App() {
  const [cards, setCards] = useState<IPropsCard[]>([]);
  const [choiseOne, setChoiseOne] = useState<IPropsCard | null>(null);
  const [choiseTwo, setChoiseTwo] = useState<IPropsCard | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    setCards(shuffledCards(primeNumbers));
  };

  const handleChoise = (card: IPropsCard) => {
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
            active={card === choiseOne || card === choiseTwo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
