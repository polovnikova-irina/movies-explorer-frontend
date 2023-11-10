import './Movies.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export function Movies() {
  return (
    <>
      <Header />
      <main className="content">
      <section className="movies">
        <SearchForm />
        <MoviesCardList />
        <button className="movies__button" aria-label='еще'>
           Ещё
         </button>
      </section>
      <Footer />
      </main>
    </>
  );
}
