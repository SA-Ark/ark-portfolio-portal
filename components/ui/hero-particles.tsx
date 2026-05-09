"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: { enable: true }
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.45 } },
      push: { quantity: 4 }
    }
  },
  particles: {
    number: { value: 80, density: { enable: true, width: 1200, height: 800 } },
    color: { value: "#00d4ff" },
    links: {
      enable: true,
      color: "#00d4ff",
      distance: 145,
      opacity: 0.24,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.65,
      direction: "none",
      outModes: { default: "bounce" }
    },
    opacity: { value: { min: 0.12, max: 0.3 } },
    size: { value: { min: 1, max: 3 } },
    shape: { type: "circle" }
  },
  detectRetina: true
};

export function HeroParticles() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const loaded = React.useCallback(async (_container?: Container) => undefined, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="pointer-events-auto absolute inset-0 z-0 opacity-80 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
      options={options}
      particlesLoaded={loaded}
    />
  );
}
