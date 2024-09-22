"use client";
import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import styles from "@/components/experience/Experience.module.css";
import { useControls } from "leva";
import { Environment } from "@react-three/drei";
import modelAnimationState from "./state.json";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { debounce } from "lodash";

studio.initialize();
studio.extend(extension);

const rohanSheet = getProject("Rohan Model").sheet("Rohan Sheet", "modelAnimationState", { state: modelAnimationState });

function Theatre() {
  const designationValues = ["FULL STACK DEVELOPER", "FRONTEND DEVELOPER ", "SOFTWARE DEVELOPER", "WEB DESIGNER", "CIVIL ENGINEER", "PROGRAMMER"];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      rohanSheet.sequence.position = window.scrollY / 550;
    };

    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            camera={{ position: [0, 0, 10], fov: 75 }}
          >
            <SheetProvider sheet={rohanSheet}>
              <Environment preset="sunset" />
              <e.group theatreKey="rohan" position={[0, -20, -10]} scale={[3, 3, 3]} rotation={[Math.PI / 2, 0, 0]}>
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
      actions["Walk"].reset().play();
    }

    // Cleanup on unmount
    return () => {
      actions["Walk"]?.stop();
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

// useGLTF.preload("/models/model.glb");

export default Theatre;
