import "./LoginModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "..//ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onSignUpClick, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      onClose={onClose}
      isOpen={isOpen}
      // onSubmit={handleLoginSubmit}
    >
      <label htmlFor="login" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email-login"
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
        Password
        <input
          type="password"
          className="modal__input"
          id="password-login"
          placeholder="Password"
          name="password"
          minLength="1"
          maxLength="30"
          value={password}
          required
          onChange={handlePasswordChange}
        />
      </label>
      <div className="modal__button-div">
        <button
          type="submit"
          className="modal__button-login"
          onClick={handleLoginSubmit}
        >
          Log In
        </button>
        <span className="modal__or-text">or</span>
        <button
          type="button"
          className="modal__button-signup"
          onClick={onSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
