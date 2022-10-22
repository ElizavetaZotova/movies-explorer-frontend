import './NavTab.css';

export default function NavTab() {
  return (
    <section className="nav-tab">
      <div className="nav-tab__links-container">
        <a href="#about_project" className="nav-tab__link" rel="noreferrer">
          О проекте
        </a>
        <a href="#techs" className="nav-tab__link" rel="noreferrer">
          Технологии
        </a>
        <a href="#about-me" className="nav-tab__link" rel="noreferrer">
          Студент
        </a>
      </div>
    </section>
  );
}
