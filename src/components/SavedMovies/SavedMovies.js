import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import SearchForm from "../Movies/SearchForm/SearchForm";
import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies(props) {

  return (
    <>
    <Header/>
    <SearchForm/>
    <FilterCheckbox
      isOpen={props.isOpen}
      onEditFilms={props.onEditFilms}
      onClose={props.onClose}
    />
    <SavedMoviesCardList/>
    <Footer/>
    </>
  );
}

export default SavedMovies;
