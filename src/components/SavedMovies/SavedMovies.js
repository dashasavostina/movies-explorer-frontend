import Header from "../Header/Header";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  return (
    <>
      <Header />
      <SearchForm />
      <section className="saved-movies">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
      <Footer />
    </>
  );
}
