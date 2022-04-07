// import './App.css';
//в апп никакой верстки просто импорты и функционал
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AboutMe from "../Main/AboutMe/AboutMe";
import AboutProject from "../Main/AboutProject/AboutProject";
import Promo from "../Main/Promo/Promo";
import Techs from "../Main/Techs/Techs";

function App() {
  //    <Header/>
  return (
    <>
    <Promo/>
    <AboutProject/>
    <Techs/>
    <AboutMe/>
    <Footer/>
    </>
  );
}

export default App;
