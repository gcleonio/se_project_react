import "./RegisterModal.css";
import { useEffect } from "react";
import ModalWithForm from "..//ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({
  isOpen,
  handleRegistration,
  onLoginClick,
  onClose,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign Up"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email-register"
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
        Password *
        <input
          type="password"
          className="modal__input"
          id="password-register"
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
      <label className="modal__label">
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
          value={values.name || ""}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          type="url"
          className="modal__input"
          id="avatar-register"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar || ""}
          required
          onChange={handleChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      <div className="modal__button-div">
        <button
          type="submit"
          className="modal__button-sign-up"
          disabled={!isValid}
        >
          Sign Up
        </button>
        <span className="modal__or-text">or</span>
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
