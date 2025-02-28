import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, handleEdit }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setImageUrl(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    handleEdit({ name, imageUrl });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleEditProfileSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name-editprofile"
          placeholder="Name"
          name="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          id="imageUrl-editprofile"
          placeholder="Avatar URL"
          name="link"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
