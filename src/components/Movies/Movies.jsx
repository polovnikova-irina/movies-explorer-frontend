import './Movies.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export function Movies(loggedIn) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className="content">
      <section className="movies">
        <SearchForm />
        <MoviesCardList />
        <button className="movies__button" type='button' aria-label='еще'>
           Ещё
         </button>
      </section>
      </main>
      <Footer />
    </>
  );
}
