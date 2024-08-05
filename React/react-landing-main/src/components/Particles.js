import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import galaxybg from '../assets/images/galaxybg.jpg'; 

const ParticlesComponent = (props) => {
  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  const options = {
    background: {
      image: `url(${galaxybg})`,
      size: "cover",
      repeat: "no-repeat"
    },
    fpsLimit: 144,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "repulse",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: false,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.6,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
