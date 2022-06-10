import Footer from "../Footer/Footer";
import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

function Main(props) {
  return (
    <>
      <Promo loggedIn={props.loggedIn} openBurgerMenu={props.openBurgerMenu} />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
}

export default Main;
