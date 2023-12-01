export const MAIN_API_URL = 'https://api.movies.park.nomoredomainsrocks.ru';
export const MOVIES_API_URL = "https://api.nomoreparties.co";

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

export const MOVIES_MESSAGES = {
    SERVER_REQUEST_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
    SEARCH_QUERY_ERROR: 'Нужно ввести ключевое слово',
    NOT_FOUND_ERROR: 'Ничего не найдено',
  };

  export const AUTH_ERRORS = {
    UNAUTHORIZED: {
      AUTH: 'Вы ввели неправильный логин или пароль',
      IDENTIFICATION: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
    },
    CONFLICT: {
      REGISTER: 'Пользователь с таким email уже существует',
      CHANGE_USER: 'Пользователь с таким email уже существует',
    },
    BAD_REQUEST: {
      REGISTER: 'При регистрации пользователя произошла ошибка',
      CHANGE_USER: 'При обновлении профиля произошла ошибка',
      COMMON: 'На сервере произошла ошибка',
    },
  };
  
  export const SUCCESS_MESSAGE = "Данные обновлены успешно";
