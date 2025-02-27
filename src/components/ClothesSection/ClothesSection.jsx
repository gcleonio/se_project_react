import "./ClothesSection.css";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const userItem =
    currentUser && currentUser._id
      ? clothingItems.filter((item) => item.owner === currentUser._id)
      : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__top-line">
        <p className="clothes-section__top-line__your-items">Your items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-new-btn"
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItem.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
