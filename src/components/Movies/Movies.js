import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Movies() {
  return (
    <>
      <Header />
      <SearchForm />
      <section className="movies">
        <MoviesCardList />
        <button type="button" className="movies__more-button">
          Ещё
        </button>
      </section>
      <Footer />
    </>
  );
}
