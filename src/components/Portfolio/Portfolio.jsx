import './Portfolio.css';
import arrowIcon from '../../images/portfolio__arrow-icon.svg';

function PortfolioItem({ title, link, isLastItem }) {
  return (
    <>
        <a className="project__link" href={link} target="_blank">
        <span className="project__title">{title}</span>
          <img className="project__arrow-icon" src={arrowIcon} alt="стрелка" />
        </a>
      {!isLastItem && <hr className="project__divider" />}
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
