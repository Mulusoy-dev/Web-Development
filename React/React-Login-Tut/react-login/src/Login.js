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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser(""); // Kullanıcı alanını temizle
    setPwd(""); // Parola alanını temizle
    setSuccess(true);
  };

  return (
    <>
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
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
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
    </>
  );
};

export default Login;
