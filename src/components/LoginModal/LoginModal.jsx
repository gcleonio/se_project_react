import "./LoginModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "..//ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onSignUpClick, handleLogin }) => {
  const [email, setEmai] = useState("");
  const [password, setPassword] = useState("");

  // also need handlePasswordChange, handleEmailChange

  // use a useEffect hook to reset the input field state to empty strings when the modal is opened

  return (
    <ModalWithForm title="Log In" onClose={onClose} isOpen={isOpen}>
      <label htmlFor="login" className="modal__label">
        Email
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
        Password
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
      <div className="modal__button-div">
        <button type="submit" className="modal__button-login">
          Log In
        </button>
        or
        <button type="button" className="modal__button-signup">
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
