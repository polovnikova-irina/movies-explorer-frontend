import './Techs.css';
import { TitleSeparator } from '../TitleSeparator/TitleSeparator';

export function Techs() {
  return (
    <div className="teach">
      <TitleSeparator title="О проекте" />
      <div className="teach__info">
        <div className="teach__info-section">
          <h2 className="teach__info-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="teach__info-subtitle">
            Составление плана, работа над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="teach__info-section">
          <h2 className="teach__info-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="teach__info-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="teach__stripe">
        <div className="teach__stripe-color teach__stripe-color_green">
          <p className="teach__stripe-text teach__stripe-text-black">
            1 неделя
          </p>
        </div>
        <div className="teach__stripe-color teach__stripe-color_black">
          <p className="teach__stripe-text teach__stripe-text-white">
            4 недели
          </p>
        </div>
        </div>
        <div className="teach__technology-stack">
          <p className="teach__technology-stack-text">Back-end</p>
          <p className="teach__technology-stack-text">Front-end</p>
        </div>
    </div>
  );
}
