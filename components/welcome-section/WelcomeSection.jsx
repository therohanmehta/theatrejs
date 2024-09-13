"use client";
import React from "react";
import styles from "./WelcomeSection.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function WelcomeSection() {
  gsap.registerPlugin(ScrollTrigger);
  const heroTextRef = useRef(null);
  useEffect(() => {
    gsap.to(heroTextRef.current, {
      transform: `${
        window.innerWidth > 600 ? "translateX(-5000px)" : "translateX(-2800px)"
      }`,
      fontWeight: 100,
      scrollTrigger: {
        trigger: "#heroSection",
        scroller: "body",
        // markers: true,
        scrub: 3,
        end: "top -400%",
        start: "top 0",
        pin: true,
      },
    });
  
  }, []);
  return (
    <div id="heroSection" className={`${styles.heroSection}`}>
      <h1 ref={heroTextRef}>WELCOME TO THE PORTFOLIO</h1>
    </div>
  );
}

export default WelcomeSection;
