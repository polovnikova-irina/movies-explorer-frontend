import './BurgerMenu.css';

export function BurgerMenu({ loggedIn }) {

  return (
     <div classname="menu">
      <div className='blur'/>
      <div className='menu__content'>
    <ul>
      <li>Главная</li>
      <li>Фильмы</li>
      <li>Сохранённые фильмы</li>
    </ul>
      </div>

     </div>>
  );
}