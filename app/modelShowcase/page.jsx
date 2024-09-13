"use client";
import Experience from "@/components/experience/Experience";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useState } from "react";
import { RohanModel } from "@/components/experience/RohanModel";
import { useControls } from "leva";

gsap.registerPlugin(ScrollTrigger);
function ModelShowcase() {
  const [stateAnimation, setStateAnimation] = useState("Walk");
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      "#model",
      {},
      {
        scrollTrigger: {
          trigger: "#target1",
          start: "top 0",
          end: "top -100%",
          // markers: true,
          scrub: true,
        },
        onComplete: () => {
          setStateAnimation("Burpee");
        },

        onReverseComplete: () => {
          setStateAnimation("Walk");
        },
      }
    );
    tl.fromTo(
      "#model",
      {},
      {
        scrollTrigger: {
          trigger: "#target1",
          start: "top -100%",
          end: "top -200%",
          // markers: true,
          scrub: true,
        },
        onComplete: () => {
          setStateAnimation("Pushup");
        },

        onReverseComplete: () => {
          setStateAnimation("Burpee");
        },
      }
    );
    tl.fromTo(
      "#model",
      {},
      {
        scrollTrigger: {
          trigger: "#target1",
          start: "top -200%",
          end: "top -300%",
          // markers: true,
          scrub: true,
        },
        onComplete: () => {
          setStateAnimation("Sleeping");
        },

        onReverseComplete: () => {
          setStateAnimation("Pushup");
        },
      }
    );
  }, []);

  // const { animation } = useControls({
  //   animation: {
  //     value: "Walk",
  //     options: ["Walk", "Pushup", "Sing", "Sleeping", "Texting", "Burpee"],
  //   },
  // });
  return (
    <div>
      <div id="model" className=" fixed top-0  " style={{ right: "-30%" }}>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            border: "2px solid red",
          }}
          className=""
          shadows
          camera={{ position: [1, 1, 40], fov: 30 }}
        >
          <Environment preset="sunset" />
          <group scale={[7, 7, 7]} position={[0, -7, 3]}>
            <RohanModel
              scrollAnimation={stateAnimation}
              // animation={animation}
              cursorFollow={false}
            />
          </group>
        </Canvas>
      </div>
      <div id="target1" className="h-screen bg-red-500 grid grid-cols-12 ">
        <div className=" bg-red-900 col-span-7"></div>
        <div className=" bg-green-900 col-span-5"></div>
      </div>
      <div id="target2" className="h-screen bg-blue-500 grid grid-cols-12 ">
        <div className=" bg-blue-900 col-span-5"></div>
        <div className=" bg-pink-900 col-span-7"></div>
      </div>
      <div className="h-screen bg-red-500 grid grid-cols-12 ">
        <div className=" bg-red-900 col-span-7"></div>
        <div className=" bg-green-900 col-span-5"></div>
      </div>
      <div className="h-screen bg-blue-500 grid grid-cols-12 ">
        <div className=" bg-blue-900 col-span-5"></div>
        <div className=" bg-pink-900 col-span-7"></div>
      </div>
    </div>
  );
}

export default ModelShowcase;
