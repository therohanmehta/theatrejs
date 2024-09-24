"use client";
import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import styles from "@/components/experience/Experience.module.css";
import { Environment } from "@react-three/drei";
import projectState from "./RohanModel.theatre-project-state.json";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { debounce } from "lodash";

studio.initialize();
studio.extend(extension);

function Theatre() {
  const project = getProject("RohanModel", { state: projectState });
  const sheet = project.sheet("RohanSheet");

  // getProject("Demo Project", { state: demoProjectState });

  const designationValues = ["FULL STACK DEVELOPER", "FRONTEND DEVELOPER ", "SOFTWARE DEVELOPER", "WEB DESIGNER", "CIVIL ENGINEER", "PROGRAMMER"];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    sheet.sequence.play({ iterationCount: Infinity, range: [0, 12.79] });
  }, [sheet]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      sheet.sequence.position = window.scrollY / window.innerHeight;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sheet]);

  return (
    <>
      <div className={`${styles.modelStylingWrapper} relative w-100 overflow-hidden  bg-black `} style={{ height: "1300vh" }}>
        <div className={`${styles.infiniteTextWrapper} w-screen overflow-hidden    fixed top-0 flex`}>
          {designationValues.map((designation) => (
            <h1 key={designation} className={`${styles.infiniteText}   w-max z-0`}>
              SOFTWARE DEVELOPER
            </h1>
          ))}
        </div>
        <div className="fixed top-0 left-0 w-full h-full">
          <Canvas
            gl={{ preserveDrawingBuffer: true }}
            style={{ height: "100vh", width: "100%" }}
            className=""
            shadows
            camera={{ position: [0, 0, 10], fov: 30 }}
          >
            <SheetProvider sheet={sheet}>
              <Environment preset="sunset" />
              <e.group theatreKey="rohan" position={[0, 0, 0]} scale={[1, 1, 1]}>
                <RohanModel />
              </e.group>
            </SheetProvider>
          </Canvas>
        </div>
      </div>
    </>
  );
}

function RohanModel(props) {
  const modelRef = useRef();

  // Load GLTF model
  const { scene } = useGLTF("/models/model.glb");

  // Load FBX animations
  const { animations: WalkingAnimation } = useFBX("/animations/Walking.fbx");

  // Apply animation names (optional if not already named in the FBX)
  WalkingAnimation[0].name = "Walk";

  // Use the animation
  const { actions } = useAnimations(WalkingAnimation, modelRef);

  // Start the walking animation on mount
  useEffect(() => {
    if (actions["Walk"]) {
      actions["Walk"].reset().fadeIn(0.5).play();
    }

    // Cleanup on unmount
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

// Preload the GLTF model to avoid reloading it later
useGLTF.preload("/models/model.glb");

export default Theatre;
