import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  // useContext hook'u kullanılarak AuthContext bağlamından setAuth fonksiyonunu çekmeyi sağlar.
  // Bu bağlamdan setAuth fonksiyonunu çekerek, Login bileşeni içinde kullanabilirsiniz.
  // useContext, useAuth hook'unun içinde kullanılarak global bir hook tanımlanmış oldu.
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // 'location.state?.from?.pathname' ile kullanıcının geldiği sayfanın 'pathname' (URL'nin yolu) bilgisine erişilmeye çalışılır.
  // Eğer bu bilgi mevcut değilse veya 'undefined' ise varsayılan olarak '/' atanır.
  // from değişkeni, giriş yapmadan önceki sayfanın 'pathname' bilgisini içerir.
  const from = location.state?.from?.pathname || "/";

  // Sayfa yüklendiğinde ik olarak input'a focus olmak için 'userRef' kullanıldı.
  // Bir hata olursa bu hataya odaklanmak için bir 'errRef' tanımlandı.
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState(""); // Kullanıcı adı için kullanılır.
  const [pwd, setPwd] = useState(""); // Parola için kullanılır.
  const [errMsg, setErrMsg] = useState(""); // Kimlik doğrulaması sonucu oluşabilecek hata durumlarını ele almak için kullanılır.

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

      // { replace:true } kullanıcı geri tuşuna bastığında giriş sayfasına değil, giriş yapmadan önceki sayfaya döner.
      // Bu kullanım, kullanıcının giriş yapmadan önce bulunduğu sayfayı hatırlamak ve giriş yaptıktan sonra doğrudan o sayfaya yönlendirmek amacıyla yapılmıştır.
      // Bu, kullanıcı deneyimini artıran bir yönlendirme davranışıdır, çünkü kullanıcı giriş yaptıktan sonra hemen önceki sayfasına dönebilir.
      navigate(from, { replace: true });
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
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 style={{ alignSelf: "center", paddingBottom: "30px" }}>Login</h1>

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
  );
};

export default Login;
