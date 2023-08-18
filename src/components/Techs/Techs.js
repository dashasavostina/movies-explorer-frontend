import "./Techs.css";

export default function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__title-block">
        <h2 className="techs__title">Технологии</h2>
      </div>
      <div className="techs__main">
        <p className="techs__main-title">7 технологий</p>
        <p className="techs__main-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__blocks">
          <div className="techs__block">
            <p className="techs__block-text">HTML</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">CSS</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">JS</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">React</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">Git</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">Express.js</p>
          </div>
          <div className="techs__block">
            <p className="techs__block-text">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}
