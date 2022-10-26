import { Link, useLocation } from 'react-router-dom';

import './Header.css';

import Navigation from './Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header({ loggedIn, onClickBurger, isBurgerOpened }) {
  const themeBlack = useLocation().pathname === '/';

  return (
    <header className={`header header_theme_${themeBlack ? 'black' : 'bright'}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип" />
        </Link>
        <Navigation
          loggedIn={loggedIn}
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}
          themeBlack={themeBlack}
        />
      </div>
    </header>
  );
}

export default Header;
