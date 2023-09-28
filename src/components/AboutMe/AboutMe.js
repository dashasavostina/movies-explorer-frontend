import "./AboutMe.css";
import student_photo from "../../images/student_photo.jpg";

export default function AboutMe() {
  return (
    <section id="about-me" className="about-block">
      <div className="about-block__title-block">
        <h2 className="about-block__title">Студент</h2>
      </div>
      <div className="about-block__content">
        <div className="about-block__text-content">
          <p className="about-block__name">Виталий</p>
          <p className="about-block__subname">Фронтенд-разработчик, 30 лет</p>
          <p className="about-block__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dashasavostina"
            className="about-block__link"
          >
            Github
          </a>
        </div>
        <img
          alt="фото студента"
          className="about-block__photo"
          src={student_photo}
        />
      </div>
    </section>
  );
}
