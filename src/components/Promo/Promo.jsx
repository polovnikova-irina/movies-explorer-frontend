import './Promo.css';
import landingLogo from '../../images/promo_landing-logo.svg';

export function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className="promo__main-illustration" src={landingLogo} alt="Промо" />
      </div>
    </section>
  );
}
