import './AboutProject.css';
import { TitleSeparator } from '../TitleSeparator/TitleSeparator';

export function AboutProject() {
  return (
    <section className="project">
      <TitleSeparator title="О проекте" />
      <div className="project__info">
        <div className="project__info-section">
          <h3 className="project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__info-subtitle">
            Составление плана, работа над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__info-section">
          <h3 className="project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__info-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__stripe">
        <div className="project__stripe-color project__stripe-color_green">
          <p className="project__stripe-text project__stripe-text-black">
            1 неделя
          </p>
        </div>
        <div className="project__stripe-color project__stripe-color_black">
          <p className="project__stripe-text project__stripe-text-white">
            4 недели
          </p>
        </div>
        </div>
        <div className="project__technology-stack">
          <p className="project__technology-stack-text">Back-end</p>
          <p className="project__technology-stack-text">Front-end</p>
        </div>
    </section>
  );
}
