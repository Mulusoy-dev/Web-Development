import { motion } from "framer-motion";
import ai_1 from "./assets/video/ai_1.mp4";

function App() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <div className="background-video">
        <video autoPlay loop muted>
          <source src={ai_1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container">
        {/* Yazıların Kenarından Gelmesi */}
        <motion.div
          className="header"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Welcome to Our Site
        </motion.div>
        <motion.div
          className="description"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        >
          Experience the future of anomaly detection with our advanced platform.
        </motion.div>
        <motion.div
          className="scroll-mouse"
          initial={{ y: 0 }}
          animate={{ y: 10 }}
          transition={{ duration: 1, yoyo: Infinity }}
          onClick={handleScroll}
        >
          <div className="mouse"></div>
        </motion.div>
      </div>
      <div className="login-section">
        <motion.div
          className="login-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Login Section</h2>
          {/* Giriş formu buraya gelecek */}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
