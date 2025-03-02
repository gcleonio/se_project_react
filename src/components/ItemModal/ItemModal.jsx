import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onOpenDelete, isLoggedIn }) {
  console.log(card);

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  // Debugging statements
  console.log("isLoggedIn:", isLoggedIn);
  console.log("isOwn", isOwn);
  console.log("card.owner", card.owner);
  console.log("currentUser._id", currentUser?._id);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        ></button>
        <img
          // src={card.link}
          src={card.imageUrl}
          alt={`Weather appropriate clothing: ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__captions">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isLoggedIn && isOwn && (
            <button
              type="text"
              className="modal__item-delete-btn"
              onClick={onOpenDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
