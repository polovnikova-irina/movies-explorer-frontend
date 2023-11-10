import React from "react";
import './PageNotFound.css'
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <main className="content">
    <div className="not-found">
      <h1 className="not-found__title">
        <span>404</span> Страница не найдена
      </h1>
      <Link className="not-found__button" to="/">
       Назад
      </Link>
    </div>
    </main>
  );
}
