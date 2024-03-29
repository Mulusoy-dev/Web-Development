import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to Admin page</Link>
      <br />
      <Link to="/lounge">Go to Lounge</Link>
      <br />
      <Link to="/linkpage">Go to link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign out</button>
      </div>
    </section>
  );
};

export default Home;
