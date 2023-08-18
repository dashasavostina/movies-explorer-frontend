import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section id="about-project" className="project">
      <div className="project__title-block">
        <h2 className="project__title">О проекте</h2>
      </div>
      <div className="project__main">
        <div className="project__text-block">
          <p className="project__text-title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__text-block">
          <p className="project__text-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__duration">
        <div className="project__backend-duration">
          <p className="project__text-duration">1 неделя</p>
          <p className="project__subtext-duration">Back-end</p>
        </div>
        <div className="project__frontend-duration">
          <p className="project__text-duration">4 недели</p>
          <p className="project__subtext-duration">Front-end</p>
        </div>
      </div>
    </section>
  );
}
