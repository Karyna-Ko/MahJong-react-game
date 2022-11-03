import './SingleCard.css';

export default function SingleCard({card, handleChoise, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled) {
            handleChoise(card)
        }
        
    }
    return (
        <div className={`card ${flipped ? "flipped" : ""}`}>
            <div className="front"><span>{card.card}</span></div>
            <div className="back" onClick={handleClick}></div>
        </div>
    )
}