import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__text-block">
        <p className="footer__copyright">&copy; 2023</p>
        <div className="footer__info">
          <a
            target="_blank"
            rel="noreferrer"
            className="footer__link"
            href="https://practicum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dashasavostina"
            className="footer__link"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
