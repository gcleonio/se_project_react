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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ name, email, password, avatar });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      onSubmit={handleRegistrationSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email-register"
          placeholder="Email"
          name="email"
          minLength="1"
          maxLength="30"
          value={email}
          required
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          type="password"
          className="modal__input"
          id="password-register"
          placeholder="Password"
          name="password"
          minLength="1"
          maxLength="30"
          value={password}
          required
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name-register"
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
          id="avatar-register"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          required
          onChange={handleAvatarChange}
        />
      </label>
      <div className="modal__button-div">
        <button
          type="button"
          className="modal__button-sign-up"
          onClick={handleRegistration}
        >
          Sign Up
        </button>
        or
        <button
          type="button"
          className="modal__button-log-in"
          onClick={onLoginClick}
        >
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
