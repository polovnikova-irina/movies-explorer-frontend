export const MAIN_API_URL = 'https://api.movies.park.nomoredomainsrocks.ru';
export const MOVIES_API_URL = 'https://api.nomoreparties.co';

export const EMAIL_REGEX = '^\\S+@\\S+\\.\\S+$';
export const NAME_REGEX = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';

export const SHORT_FILM_DURATION = 40;

export const SCREEN_SIZES = {
  L: 1280,
  M: 768,
  S: 480,
};

export const INITIAL_COUNT = {
  L_SCREEN: 16,
  M_SCREEN: 8,
  S_SCREEN: 5,
};

export const INCREMENT_VALUES = {
  L_SCREEN: 4,
  M_SCREEN: 2,
  S_SCREEN: 2,
};

export const profileErrorMessage = {
  409: 'Пользователь с таким email уже существует',
  400: 'При обновлении профиля произошла ошибка',
  401: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
};

export const registerErrorMessage = {
  409: 'Пользователь с таким email уже существует',
  400: 'При регистрации пользователя произошла ошибка',
};

export const signInErrorMessage = {
  401: 'При авторизации произошла ошибка',
};

export const MOVIES_MESSAGES = {
  SERVER_REQUEST_ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  SEARCH_QUERY_ERROR: 'Нужно ввести ключевое слово',
  NOT_FOUND_ERROR: 'Ничего не найдено',
};

export const SUCCESS_MESSAGE = 'Данные успешно обновлены';
