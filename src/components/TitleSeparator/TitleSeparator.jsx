import './TitleSeparator.css';

export function TitleSeparator( { title }) {
  return (
    <div className="title-separator">
    <h1 className="title-separator__text">{title}</h1>
    <hr className="title-separator__hr"/>
  </div>
  );
}