import './Portfolio.css';
import arrowIcon from '../../images/portfolio__arrow-icon.svg';

export function Portfolio() {
  const projects = [
    {
      title: 'Статичный сайт',
      link: 'https://github.com/polovnikova-irina/how-to-learn',
    },
    {
      title: 'Адаптивный сайт',
      link: 'https://github.com/polovnikova-irina/russian-travel',
    },
    {
      title: 'Одностраничное приложение',
      link: 'https://github.com/polovnikova-irina/react-mesto-api-full-gha',
    },
  ];

  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        {projects.map((project, index) => (
          <li key={index} className="portfolio__item">
            <a className="portfolio__link" href={project.link} target="_blank" rel="noreferrer">
              <span className="portfolio__name">{project.title}</span>
              <img className="portfolio__arrow-icon" src={arrowIcon} alt="стрелка" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

