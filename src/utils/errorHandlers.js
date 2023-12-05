import { profileErrorMessage, registerErrorMessage, signInErrorMessage } from './constants';

export function getProfileErrorMessage(err) {
    return profileErrorMessage[err] || 'На сервере произошла ошибка';
  }
  
  export function getRegisterErrorMessage(err) {
    return registerErrorMessage[err] || 'На сервере произошла ошибка';
  }
  
  export function getSignInErrorMessage(err) {
    return signInErrorMessage[err] || 'На сервере произошла ошибка';
  }