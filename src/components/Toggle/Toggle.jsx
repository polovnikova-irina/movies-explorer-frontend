import React, { useState } from 'react';
import './Toggle.css';

export function Toggle({ isFilterActive, onFilterChange }) {

  return (
    <div className="search__toggle-container">
      <label className="search__toggl-label">
        <input
          className="search__toggle-checkbox"
          type="checkbox"
          checked={isFilterActive}
          onChange={(evt) => { 
            const isChecked = evt.target.checked;
            console.log('Toggle - Checkbox checked:', isChecked);
            onFilterChange(isChecked);
          }}
        />
        <span className={`search__toggle-icon ${isFilterActive ? 'search__toggle-icon_on' : 'search__toggle-icon_off'}`} />
      </label>
      <span className="search__toggle-text">Короткометражки</span>
    </div>
  );
}
