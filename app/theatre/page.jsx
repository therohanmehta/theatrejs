"use client";
import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import styles from "@/components/experience/Experience.module.css";
import { Environment, ScrollControls } from "@react-three/drei";
import projectState from "./RohanModel.theatre-project-state.json";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import GsapIntro from "@/components/GsapIntro/GsapIntro";
import Lenis from "@studio-freight/lenis";

function Theatre() {
  const project = getProject("RohanModel", { state: projectState });
  const sheet = project.sheet("RohanSheet");
  const designationValues = ["FULL STACK DEVELOPER", "FRONTEND DEVELOPER", "SOFTWARE DEVELOPER", "WEB DESIGNER", "CIVIL ENGINEER", "PROGRAMMER"];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
      sheet.sequence.position = window.scrollY / window.innerHeight; // Update sequence based on scroll
    };

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [sheet]);

  return (
    <div className={`${styles.modelStylingWrapper} relative w-full flex flex-col  bg-black`} style={{ height: "1300vh" }}>
      <div className={`${styles.infiniteTextWrapper} w-screen overflow-hidden    absolute top-3/2 flex`}>
        {designationValues.map((desigination) => (
          <h1 key={desigination} className={`${styles.infiniteText}   w-max z-0`}>
            SOFTWARE DEVELOPER
          </h1>
        ))}
      </div>
      <GsapIntro />
      <div className="fixed top-0 left-0 w-full h-full">
        <Canvas gl={{ preserveDrawingBuffer: true }} style={{ height: "100vh", width: "100%" }} shadows camera={{ position: [0, 0, 10], fov: 30 }}>
          <SheetProvider sheet={sheet}>
            <Environment preset="sunset" />
            <e.group theatreKey="rohan" position={[0, 0, 0]} scale={[1, 1, 1]}>
              <RohanModel />
            </e.group>
          </SheetProvider>
        </Canvas>
      </div>
    </div>
  );
}

function RohanModel(props) {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/model.glb");
  const { animations: WalkingAnimation } = useFBX("/animations/Walking.fbx");

  // Set the animation name
  WalkingAnimation[0].name = "Walk";
  const { actions } = useAnimations(WalkingAnimation, modelRef);

  useEffect(() => {
    if (actions["Walk"]) {
      actions["Walk"].reset().fadeIn(0.5).play();
    }

    return () => {
      actions["Walk"]?.fadeOut(0.5).stop();
    };
  }, [actions]);

  return (
    <group {...props} ref={modelRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/model.glb");

export default Theatre;
