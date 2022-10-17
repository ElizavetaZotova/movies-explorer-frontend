import { Link } from 'react-router-dom';

import './Header.css';

import Navigation from './Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header({ themeLight, authorized, onClickBurger, isBurgerOpened }) {
  return (
    <header className={`header header_theme_${themeLight ? 'light' : 'bright'}`}>
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип" />
        </Link>
        <Navigation
          authorized={authorized}
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}
          themeLight={themeLight}
        />
      </div>
    </header>
  );
}

export default Header;
