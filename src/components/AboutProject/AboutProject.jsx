import './AboutProject.css';
import landingLogo from '../../images/aboutProject_landing-logo.svg';

export function AboutProject() {
  return (
    <div className="project">
      <div className="project__container">
        <h1 className="project__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className="project__main-illustration" src={landingLogo} alt="Логотип" />
      </div>
    </div>
  );
}
