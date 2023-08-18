import "./Portfolio.css";
import strelka from "../../images/logo-link.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <nav className="portfolio__links">
        <a
          target="_blank"
          href="https://github.com/dashasavostina/how-to-learn"
          className="portfolio__link" rel="noreferrer"
        >
          Статичный сайт
          <img
            className="portfolio__logo-link"
            src={strelka}
            alt="иконка стрелки"
          />
        </a>
        <a
          target="_blank"
          href="https://github.com/dashasavostina/russian-travel"
          className="portfolio__link portfolio__link_underlined" rel="noreferrer"
        >
          Адаптивный сайт
          <img
            className="portfolio__logo-link"
            src={strelka}
            alt="иконка стрелки"
          />
        </a>
        <a
          target="_blank"
          href="https://github.com/dashasavostina/react-mesto-api-full-gha"
          className="portfolio__link" rel="noreferrer"
        >
          Одностраничное приложение
          <img
            className="portfolio__logo-link"
            src={strelka}
            alt="иконка стрелки"
          />
        </a>
      </nav>
    </section>
  );
}
