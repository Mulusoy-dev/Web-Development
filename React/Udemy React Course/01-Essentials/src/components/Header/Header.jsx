import header_img from "../../assets/react-core-concepts.png";
import "./Header.css";
const reactDesc = ["Fundamental", "Core", "Crucial"];

function genRandomDesc() {
  return Math.floor(Math.random() * reactDesc.length);
}

function Header() {
  const description = reactDesc[genRandomDesc()];

  return (
    <header>
      <img src={header_img} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;
