import React, { useState } from 'react';
import './Toggle.css';

export function Toggle() {
  const [isToggled, setIsToggled] = useState(false);
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="search__toggle-container">
      <label className="search__toggl-label">
        <input
          className="search__toggle-checkbox"
          type="checkbox"
          checked={isToggled}
          onChange={toggleSwitch}
        />
        <div className={`search__toggle-icon ${isToggled ? 'search__toggle-icon_on' : 'search__toggle-icon_off'}`} />
      </label>
      <p className="search__toggle-shortfilms">Короткометражки</p>
    </div>
  );
}
