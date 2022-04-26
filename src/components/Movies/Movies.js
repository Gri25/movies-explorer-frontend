import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  return (
    <>
      <Header />
      <SearchForm />
      <FilterCheckbox
        isOpen={props.isOpen}
        onEditFilms={props.onEditFilms}
        onClose={props.onClose}
        addMovies={props.addMovies}
      />
      <MoviesCardList cards={props.cards} />
      <Preloader />
      <Footer />
    </>
  );
}

export default Movies;
