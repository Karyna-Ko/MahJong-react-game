import './SingleCard.css';

export default function SingleCard({
  card,
  handleChoise,
  flipped,
  disabled,
  active,
}) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoise(card);
    }
  };

  const classFlipped = flipped ? ' flipped' : '';
  const classActive = active ? ' active' : '';

  return (
    <div className={'card ' + classFlipped + classActive} onClick={handleClick}>
      <p className="num">{card.card}</p>
    </div>
  );
}
