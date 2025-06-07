import "./ModalWithConfirm.css";

function ModalWithConfirm({ activeModal, onClose, handleDeleteCard }) {
  return (
    <div className={`modal ${activeModal === "confirm" && "modal_opened"}`}>
      <div className="modal__content modal__content-type-confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_confirm-delete"
        ></button>
        <div className="modal__footer-confirm">
          <h2 className="modal__caption-confirm">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <button
            onClick={handleDeleteCard}
            type="button"
            className="modal__delete-confirm-btn"
          >
            Yes, delete item
          </button>
          <button onClick={onClose} type="button" className="modal__cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWithConfirm;
