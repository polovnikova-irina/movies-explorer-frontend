import './AboutMe.css';
import { TitleSeparator } from '../TitleSeparator/TitleSeparator';
import profilePhoto from '../../images/about-me__profile-photo.jpg';

export function AboutMe() {
  return (
    <section className="about-me">
      <TitleSeparator title="Студент" />
      <div className="about-me__container">
        <img className="about-me__photo" src={profilePhoto} alt="Фотография профиля пользователя" />
        <div className="about-me__details">
      <h3 className="about-me__author">Виталий</h3>
      <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__description">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена&nbsp; и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С&nbsp; 2015 года работал в компании «СКБ Контур». После того,&nbsp;
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a className="about-me__link" href="https://github.com/polovnikova-irina" target="_blank" rel="noreferrer">Github</a>
      </div>
      </div>      
    </section>
  );
}
