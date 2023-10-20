import './TitleSeparator.css';

export function TitleSeparator( { title }) {
  return (
    <div className="header-separator">
    <h1 className="header-separator__title">{title}</h1>
    <hr className="header-separator__hr"/>
  </div>
  );
}