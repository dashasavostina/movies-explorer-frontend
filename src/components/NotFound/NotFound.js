import { useHistory} from "react-router-dom/cjs/react-router-dom.min";
import "./NotFound.css";

export default function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
      <p className="not-found__status">404</p>
      <h3 className="not-found__title">Страница не найдена</h3>
      <button className="not-found__button" to="" onClick={() => history.goBack()}>
        Назад
      </button>
    </section>
  );
} 
