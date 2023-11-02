import './Movies.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export function Movies() {
  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}
