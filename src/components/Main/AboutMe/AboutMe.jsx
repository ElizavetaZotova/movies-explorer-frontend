import './AboutMe.css';
import photo from '../../../images/photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Елизавета</h3>
            <p className="about-me__age">Фронтенд-разработчик, 25 лет</p>
            <p className="about-me__text">
            3 года работаю QA - инженером, а год назад решила, что хочу
            ближе познакомится с кодом и вот теперь вы находитесь на моем сайте.
            Этот сайт - дипломный проект на курсе от Яндекс Практикума по направлению
            веб-разработка. В нем собраны все знания которые я освоила за время обучения.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/ElizavetaZotova"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__photo"
            src={photo}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
}
