import React from "react";
import './PageNotFound.css'
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className="content">
    <div className="not-found">
      <h2 className="not-found__title">
        <span>404</span> Страница не найдена
      </h2>
      <button className="not-found__button" onClick={handleGoBack} >
       Назад
      </button>
    </div>
    </main>
  );
}
