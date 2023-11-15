import './SavedMovies.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export function SavedMovies(loggedIn) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </section>
      </main>
      <Footer />
    </>
  );
}