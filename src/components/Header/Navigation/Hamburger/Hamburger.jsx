import './Hamburger.css';

export default function Hamburger({ isBurgerOpened, onClickBurger }) {
  const handleOnClickBurger = () => {
    onClickBurger(isBurgerOpened);
  };

  return (
    <button
      type="button"
      className={`hamburger-button hamburger-button_${
        isBurgerOpened ? 'on' : 'off'
      }`}
      onClick={handleOnClickBurger}
    >
      <span></span>
    </button>
  );
}
