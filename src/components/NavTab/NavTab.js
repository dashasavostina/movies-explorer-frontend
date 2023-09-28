import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="nav">
      <a href="#about-project" className="nav__link">
        О проекте
      </a>
      <a href="#techs" className="nav__link">
        Технологии
      </a>
      <a href="#about-me" className="nav__link">
        Студент
      </a>
    </nav>
  );
}
