import './AboutProject.css';
import { TitleSeparator } from '../TitleSeparator/TitleSeparator';

export function AboutProject() {
  return (
    <section className="project">
      <TitleSeparator title="О проекте" />
      <ul className="project__info">
        <li className="project__info-section">
          <h3 className="project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__info-subtitle">
            Составление плана, работа над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__info-section">
          <h3 className="project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__info-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="project__stripe">
        <li className="project__stripe-area project__stripe-area_color_one">
          <p className="project__stripe-time project__stripe-time_color_one">
            1 неделя
          </p>
          <p className="project__stripe-stack">Back-end</p>
        </li>
        <li className="project__stripe-area project__stripe-area_color_two">
          <p className="project__stripe-time project__stripe-time_color_two">
            4 недели
          </p>
          <p className="project__stripe-stack">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
