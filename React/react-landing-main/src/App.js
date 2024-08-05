import React from "react";
import "./app.css";
import { Typewriter } from "react-simple-typewriter";
import ParticlesComponent from "./components/Particles";

// import images
import slider1 from './assets/images/slider1.webp'; 
import slider2 from './assets/images/slider2.jpg'; 
import slider3 from './assets/images/slider3.jpg'; 
import slider4 from './assets/images/slider4.avif'; 

// import Swiper core and required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <div className="app">
      <div className="content">
        <div className="info-landing">
          <h1>Unlock Information's Power</h1>
          <span className="typewriter">
            <Typewriter
              words={["Track", "Manage", "Develop", "Optimize"]}
              loop={50}
              cursor
              cursorStyle="_"
              typeSpeed={150}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </span>
        </div>
        <Swiper
          slidesPerView={"1.6"}
          centeredSlides={true}
          spaceBetween={20}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src= {slider1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src= {slider2}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src= {slider3}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src= {slider4}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="scrollDownBtn">
        <svg className="arrows" viewBox="0 0 37 55">
          <path className="a1" d="M3 0 L18.5 20 L34 0"></path>
          <path className="a2" d="M3 18 L18.5 38 L34 18"></path>
          <path className="a3" d="M3 36 L18.5 56 L34 36"></path>
        </svg>

        <p className="scrollText">Scroll down to explore</p>
      </div>
      <ParticlesComponent id="tsparticles" />
    </div>
  );
}

export default App;
