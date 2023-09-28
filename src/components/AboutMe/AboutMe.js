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
          <p className="about-block__name">Дарья</p>
          <p className="about-block__subname">Фронтенд-разработчик, 28 лет</p>
          <p className="about-block__text">
            Я живу в Москве, окончила факультет машиностроительных технологий МГТУ&nbsp;им.&nbsp;Н.&nbsp;Э.&nbsp;Баумана. У
            меня есть муж и сын. С 2015 года занималась репетиторством, преподавала школьную математику. 
            Недавно решила пойти в IT. Прошла курс по веб-разработке в Яндекс Практикум и теперь ищу постоянную работу 
            в этой сфере.
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
