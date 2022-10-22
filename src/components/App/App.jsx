import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import './App.css';
import mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useEscapePress from '../../hooks/useEscapePress';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movie/Movies/Movies';
import SavedMovies from '../Movie/SavedMovies/SavedMovies';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];
  const footerEndpoints = ['/movies', '/saved-movies', '/'];

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  useEscapePress(onClickBurger, isBurgerOpened);

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  function goBack() {
    history.goBack();
  }

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    setRegisterError(null);

    mainApi
      .createUser(name, email, password)
      .then((data) => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch((err) =>
        setRegisterError(err)
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    setLoginError(null);

    mainApi
      .login(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) =>
        setLoginError(err)
      )
      .finally(() => setIsLoader(false));
  }

  function handleSignOut() {
    mainApi
    .logout()
    .then(() => {
      setCurrentUser({});
      setLoggedIn(false);
      history.push('/');
    })
    .catch((err) =>
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
    .finally(() => setIsLoader(false));
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch((err) =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then((newMovie) => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch((err) =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function checkAuth() {
    setIsLoader(true);

    mainApi
      .getUserInfo()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setCurrentUser(data);
          history.push(location.pathname);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoader(false);
        setLoad(true);
      });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          const userSavedMoviesList = data.filter(
            (m) => m.owner === currentUser._id
          );
          setSavedMoviesList(userSavedMoviesList);
        })
        .catch((err) =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);

  return (
    <div className="app">
      {!load ? (
        <Preloader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={headerEndpoints}>
            <Header
              loggedIn={loggedIn}
              onClickBurger={onClickBurger}
              isBurgerOpened={isBurgerOpened}
            />
          </Route>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/signup">
              {!loggedIn ? (
                <Register handleRegister={handleRegister} registerError={registerError}/>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/signin">
              {!loggedIn ? (
                <Login handleLogin={handleLogin} loginError={loginError}/>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              setIsLoader={setIsLoader}
              setIsInfoTooltip={setIsInfoTooltip}
              savedMoviesList={savedMoviesList}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
              setIsInfoTooltip={setIsInfoTooltip}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleProfile={handleProfile}
              handleSignOut={handleSignOut}
            />
            <Route path="*">
              <NotFound goBack={goBack} />
            </Route>
          </Switch>
          <Preloader isOpen={isLoader} />
          <Route exact path={footerEndpoints}>
            <Footer />
          </Route>
          <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}
