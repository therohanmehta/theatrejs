"use client";
import { RohanModel } from "@/components/experience/RohanModel";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { getProject } from "@theatre/core";

// Initialize a flag to track whether the extension has been initialized
let theatreInitialized = false;

function Theatre() {
  const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

  useEffect(() => {
    // Check if the extension has already been initialized
    if (!theatreInitialized) {
      studio.initialize();
      studio.extend(extension);
      theatreInitialized = true; // Set the flag to true after initialization
    }
  }, []);

  return (
    <>
      <Canvas style={{ height: "100vh", width: "100%" }} className="" shadows camera={{ position: [1, 1, 40], fov: 30 }}>
        {/* <color attach="background" args={["red"]} /> */}
        <Environment preset="sunset" />
        <group position={[0, -20, -10]} scale={[15, 15, 15]}>
          <RohanModel cursorFollow={true} />
        </group>
      </Canvas>
    </>
  );
}

export default Theatre;
