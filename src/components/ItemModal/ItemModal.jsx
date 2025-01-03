import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  // handleDeleteCard,
  onOpenDelete,
}) {
  console.log(card);

  // const deleteCardClick = () => {
  //   handleDeleteCard(card._id);
  // };

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
          <button
            type="text"
            className="modal__item-delete-btn"
            onClick={onOpenDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
