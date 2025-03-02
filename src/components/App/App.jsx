import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteCard,
  editUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { registerUser, loginUser, verifyToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    const isLiked = item.likes.some((id) => id === currentUser._id); // Check if the user's id is in the card's likes array

    // Check if this card is not currently liked
    if (!isLiked) {
      // if so, send a request to add the user's id to the card's likes array
      addCardLike(item._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((card) => (card._id === item._id ? updatedCard : card))
          );
        })
        .catch((err) => console.error(err));
    } else {
      // if not, send a request to remove the user's id from the card's likes array
      removeCardLike(item._id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((card) => (card._id === item._id ? updatedCard : card))
          );
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      //clean up function for removing the listener if the component unmounts
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // dependencies array in order to watch activeModal

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const toggleModal = () => {
    setActiveModal((prev) => (prev === "signup" ? "login" : "signup"));
  };

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(currentUser === null);
    localStorage.clear();
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather, token })
      .then((res) => {
        setClothingItems((prevItems) => {
          return [res, ...prevItems];
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    deleteCard(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  const handleLogin = (values) => {
    if (!values) {
      return;
    }
    loginUser(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return verifyToken(data.token);
      })
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error(err));
  };

  const handleRegistration = (values) => {
    registerUser(values)
      .then((res) => {
        console.log(res);
        closeActiveModal();
        handleLogin({ email: values.email, password: values.password });
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = ({ name, imageUrl }) => {
    const token = localStorage.getItem("jwt");
    editUser(name, imageUrl, token)
      .then((updatedUser) => {
        console.log("API response:", updatedUser);
        setCurrentUser(updatedUser.data);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);
  // console.log(currentTemperatureUnit);
  console.log(weatherData);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        // set the clothing items
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      verifyToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={handleRegisterModal}
              onLoginClick={handleLoginModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    // pass clothingItems as a prop
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onLogoutClick={handleLogout}
                      onEditClick={handleEditModal}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenDelete={handleOpenDelete}
            isLoggedIn={isLoggedIn}
          />
          <ModalWithConfirm
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
            buttonText={"Yes, delete item"}
          />
          <RegisterModal
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            isOpen={activeModal === "signup"}
            onLoginClick={toggleModal}
          />
          <LoginModal
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            isOpen={activeModal === "login"}
            onSignUpClick={toggleModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
