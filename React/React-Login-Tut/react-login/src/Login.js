import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";

import axios from "./api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  // useContext hook'u kullanılarak AuthContext bağlamından setAuth fonksiyonunu çekmeyi sağlar.
  // Bu bağlamdan setAuth fonksiyonunu çekerek, Login bileşeni içinde kullanabilirsiniz.
  const { setAuth } = useContext(AuthContext);

  // Sayfa yüklendiğinde ik olarak input'a focus olmak için 'userRef' kullanıldı.
  // Bir hata olursa bu hataya odaklanmak için bir 'errRef' tanımlandı.
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState(""); // Kullanıcı adı için kullanılır.
  const [pwd, setPwd] = useState(""); // Parola için kullanılır.
  const [errMsg, setErrMsg] = useState(""); // Kimlik doğrulaması sonucu oluşabilecek hata durumlarını ele almak için kullanılır.
  const [success, setSuccess] = useState(false); // başarılı durumu için kullanılır.

  useEffect(() => {
    // komponent ilk yüklendiğinde input'a odaklanmak için kullanılır.
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // kullanıcı adı ve parola değiştiğinde olası hata mesajını temizler.
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // authentication işlemleri burada yapılacak.
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser(""); // Kullanıcı alanını temizle
      setPwd(""); // Parola alanını temizle
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="app">
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 style={{ alignSelf: "center", paddingBottom: "30px" }}>
              Login
            </h1>

            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="username">Username:</label> */}
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Username or E-mail"
                required
              />
              {/* <label htmlFor="password">Password:</label> */}
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder="Password"
                required
              />
              <button>Login</button>
            </form>
            <p>
              Need an Account?
              <br />
              <span className="line">
                {/* put router link here */}
                <a href="#">Sign Up</a>
              </span>
            </p>
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
