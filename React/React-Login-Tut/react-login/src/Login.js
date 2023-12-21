import { useRef, useState, useEffect } from "react";

const Login = () => {
  // Sayfa yüklendiğinde ik olarak input'a focus olmak için 'userRef' kullanıldı
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
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
      </form>
    </section>
  );
};

export default Login;
