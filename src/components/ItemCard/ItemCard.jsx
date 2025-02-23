import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const itemLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card__like";

  const handleLike = () => {
    onCardLike(item);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser ? (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        ></button>
      ) : (
        <></>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        // src={item.link}
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
