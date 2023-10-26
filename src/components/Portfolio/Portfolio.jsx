import './Portfolio.css';
import arrowIcon from '../../images/portfolio__arrow-icon.svg';

function PortfolioItem({ title, link, isLastItem }) {
  return (
    <>
      <div className="portfolio__item">
        <a className="portfolio__link" href={link} target="_blank">
          {title}
        </a>
        <a className="portfolio__link" href={link} target="_blank">
          <img className="portfolio__arrow-icon" src={arrowIcon} alt="стрелка" />
        </a>
      </div>
      {!isLastItem && <hr className="portfolio__divider" />}
    </>
  );
}

export function Portfolio() {
  const projects = [
    {
      title: 'Статичный сайт',
      link: 'https://github.com/polovnikova-irina',
    },
    {
      title: 'Адаптивный сайт',
      link: 'https://github.com/polovnikova-irina',
    },
    {
      title: 'Одностраничное приложение',
      link: 'https://github.com/polovnikova-irina',
    },
  ];

  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__container">
        {projects.map((project, index) => (
          <PortfolioItem
            key={index}
            title={project.title}
            link={project.link}
            isLastItem={index === projects.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
