import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
  <p className="footer__copyright">Учебный проект Яндекс.Практикум x BeatFilm.</p>
  <hr className="footer__divider" />
  <div className="footer__container">
  <ul className="footer__info">
    <li><a className="footer__link" href="https://practicum.yandex.ru/" target="_blank"  rel="noreferrer">Яндекс.Практикум</a></li>
    <li><a className="footer__link" href="https://github.com/" target="_blank"  rel="noreferrer">Github</a></li>
      </ul>
      <p className="footer__copyright-year">©2023</p>
  </div>
</footer>
  );
}
