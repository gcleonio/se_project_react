import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "..//ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  handleRegistration,
  onLoginClick,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [email, setEmai] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  // also need handlePasswordChange, handleEmailChange, handleAvatarChange, handleRegistrationSubmit

  // use a useEffect hook to reset the input field state to empty strings when the modal is opened

  return (
    <ModalWithForm title="Sign Up" onClose={onClose} isOpen={isOpen}>
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          minLength="1"
          maxLength="30"
          value={email}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          minLength="1"
          maxLength="30"
          value={password}
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          required
        />
      </label>
      <div className="modal__button-div">
        <button type="button" className="modal__button-sign-up">
          Sign Up
        </button>
        or
        <button type="button" className="modal__button-log-in">
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
