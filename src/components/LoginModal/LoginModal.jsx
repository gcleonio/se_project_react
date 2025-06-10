import "./LoginModal.css";
import { useEffect } from "react";
import ModalWithForm from "..//ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({ isOpen, onClose, onSignUpClick, handleLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email: values.email, password: values.password })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email-login"
          placeholder="Email"
          name="email"
          minLength="1"
          maxLength="30"
          value={values.email || ""}
          required
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password-login"
          placeholder="Password"
          name="password"
          minLength="1"
          maxLength="30"
          value={values.password || ""}
          required
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <div className="modal__button-div">
        <button
          type="submit"
          className="modal__button-login"
          disabled={!isValid}
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
