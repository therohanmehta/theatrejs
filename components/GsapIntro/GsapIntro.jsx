"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import image1 from "@/public/image.jpg";
import image2 from "@/public/image2.jpg";
import image3 from "@/public/image3.jpg";
import mummykaisiha from "@/public/mummykaisiha.jpg";
import styles from "./GsapIntro.module.css";
gsap.registerPlugin(ScrollTrigger);

function GsapIntro() {
  const containerRef = useRef(null);

  useEffect(() => {
    const images = containerRef.current?.querySelectorAll("img");

    images.forEach((image, ind) => {
      gsap.fromTo(
        image,
        {
          height: 200,
          width: 200,
          transform: ind % 2 === 0 ? "rotate(-25deg)" : "rotate(25deg)",
        },
        {
          height: "100%",
          width: "100%",
          transform: "rotate(0deg)",
          scrollTrigger: {
            trigger: image,
            end: "top 30%",
            start: "top 50%",
            scrub: true,
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} id="body" className={`${styles.container} flex flex-col w-full h-auto`}>
      <div className="h-[100vh] sticky top-10"></div>
      <div className="h-[100vh] sticky top-10">
        <Image id="image2" src={image2} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image3} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image1} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image2} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image3} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image1} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image2} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image3} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image1} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image1} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={image1} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <div className="h-[100vh] sticky top-10">
        <Image src={mummykaisiha} alt="1" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default GsapIntro;
