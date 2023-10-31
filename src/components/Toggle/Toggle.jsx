import React, { useState } from 'react';
import './Toggle.css';

export function Toggle() {
  const [isToggled, setIsToggled] = useState(false);
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle__container">
      <label className="toggle__label">
        <input
          className="toggle__checkbox"
          type="checkbox"
          checked={isToggled}
          onChange={toggleSwitch}
        />
        <div className={`toggle__icon ${isToggled ? 'toggle__icon_on' : 'toggle__icon_off'}`} />
      </label>
      <p className="toggle__short-films">Короткометражки</p>
    </div>
  );
}
