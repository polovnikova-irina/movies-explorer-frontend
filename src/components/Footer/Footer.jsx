import './Footer.css';

export function Footer() {
  return (
    <section className="footer">
  <p className="footer__copyright">Учебный проект Яндекс.Практикум x BeatFilm.</p>
  <hr className="footer__divider" />
  <div className="footer__container">
  <div className="footer__info">
    <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
      <a className="footer__link" href="https://github.com/" target="_blank">Github</a>
      </div>
      <p className="footer__copyright-year">©2023</p>
  </div>
</section>
  );
}
