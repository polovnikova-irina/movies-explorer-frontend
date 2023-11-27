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
          onChange={(evt) => onFilterChange(evt.target.checked)}
        />
        <span className={`search__toggle-icon ${isFilterActive ? 'search__toggle-icon_on' : 'search__toggle-icon_off'}`} />
      </label>
      <span className="search__toggle-text">Короткометражки</span>
    </div>
  );
}
