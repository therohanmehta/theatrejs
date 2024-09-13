import React, { useEffect } from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import image0 from "@/public/hero-section/image1.jpeg";
import image1 from "@/public/hero-section/image4.jpeg";
import image2 from "@/public/hero-section/image3.jpeg";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
function HeroSection() {
  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#image1",
  //       start: "top 10%",
  //       toggleActions: "play none none none",
  //       // markers: true,
  //     },
  //   });

  //   tl.fromTo(
  //     "#image1",
  //     {
  //       x: 500,
  //     },
  //     {
  //       x: 0,
  //       duration: 1,
  //     }
  //   );
  //   tl.fromTo(
  //     "#image3",
  //     {
  //       x: 1000,
  //     },
  //     {
  //       x: 0,
  //       duration: 1,
  //     }
  //   );
  //   tl.fromTo(
  //     "#image2",
  //     {
  //       xPercent: -400,
  //     },
  //     {
  //       xPercent: 15,
  //       duration: 1,
  //     }
  //   );
  // }, []);

  return (
    <div className={styles.Wrapper}>
      <div
        className={`${styles.imageLayoutWrapper} h-screen w-full flex flex-wrap relative `}
      >
        {/* <div className={`${styles.textSection} h-1/2 w-1/2 overflow-visible`}>
          <h1 className="flex items-center justify-end  w-full h-full text-6xl text-red-500 text-right uppercase ">
            Civil Engineer who
            <br />
            knows to code
          </h1>
        </div> */}
        <Image
          id="image0"
          className={`${styles.image4} h-1/2  w-1/2  object-cover`}
          src={image0}
          alt="123"
          height={300}
          width={700}
        ></Image>
        <Image
          id="image1"
          className={`${styles.image1} h-1/2  w-1/2  object-cover`}
          src={image0}
          alt="123"
          height={300}
          width={700}
        ></Image>
        <Image
          id="image2"
          className={`${styles.image0} h-1/2 w-1/2  object-cover  `}
          src={image1}
          alt="123"
          height={300}
          width={700}
        ></Image>
        <Image
          id="image3"
          className={`${styles.image4} h-1/2 w-1/2  object-cover `}
          src={image2}
          alt="123"
          height={300}
          width={700}
        ></Image>
      </div>
    </div>
  );
}

export default HeroSection;
