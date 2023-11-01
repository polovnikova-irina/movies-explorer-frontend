import './Movies.css';
import { SearchForm } from "../SearchForm/SearchForm";
// import { Preloader } from "../Preloader/Preloader";
// import { MoviesCardList } from "../MoviesCardList/MoviesCardList;
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function Movies() {
    return (
    <section className="movies">
        <SearchForm />
        < MoviesCard />
        {/* <Preloader />
        <MoviesCardList />
        <MoviesCard /> */}
      </ section>
    );
  }