"use client";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { RohanModel } from "./RohanModel";
import { useRef, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense } from "react";
import { useControls } from "leva";
import styles from "./Experience.module.css";
function Experience() {
  const groupRef = useRef();

  // const { animation } = useControls({
  //   animation: {
  //     value: "Walk",
  //     options: ["Walk"],
  //   },
  // });

  const designationValues = ["FULL STACK DEVELOPER", "FRONTEND DEVELOPER ", "SOFTWARE DEVELOPER", "WEB DESIGNER", "CIVIL ENGINEER", "PROGRAMMER"];

  return (
    <div className={`${styles.modelStylingWrapper} relative w-100 overflow-hidden  bg-black `}>
      <div className={`${styles.infiniteTextWrapper} w-screen overflow-hidden    absolute top-3/2 flex`}>
        {designationValues.map((desigination) => (
          <h1 key={desigination} className={`${styles.infiniteText}   w-max z-0`}>
            SOFTWARE DEVELOPER
          </h1>
        ))}
      </div>
      <Canvas style={{ height: "100vh", width: "100%" }} className="" shadows camera={{ position: [1, 1, 40], fov: 30 }}>
        {/* <color attach="background" args={["red"]} /> */}
        <Environment preset="sunset" />
        <group ref={groupRef} position={[0, -20, -10]} scale={[15, 15, 15]} rotation={[Math.PI / 2, 0, 0]}>
          <RohanModel cursorFollow={true} />
        </group>
      </Canvas>
    </div>
  );
}

export default Experience;
