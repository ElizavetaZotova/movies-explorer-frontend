import './App.css';
import moviesData from '../../utils/movies';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movie/Movies/Movies';
import SavedMovies from '../Movie/Movies/Movies';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

export default function App() {
  const history = useHistory();
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  function onClickBurger(isBurgerOpened) {
    setIsBurgerOpened(!isBurgerOpened);
  };

  function goBack() {
    history.goBack();
  };

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved
    }))
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header themeBlack={false} authorized={false} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header themeBlack={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Movies movies={movies} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header themeBlack={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <SavedMovies movies={savedMovies}/>
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header themeBlack={true} authorized={true} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened} />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound goBack={goBack} />
        </Route>
      </Switch>
    </div>
  )
}
