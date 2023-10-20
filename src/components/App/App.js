import '../../vendor/fonts/fonts.css';
import { Header } from "../Header/Header";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";

function App() {
  return (
    <div className="page">
    <Header/ >
    <AboutProject/ >
    <Techs/ >
    </div>
  );
}

export default App;
