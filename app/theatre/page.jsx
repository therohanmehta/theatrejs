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
            className="bg-red-400"
            shadows
            camera={{ position: [1, 1, 40], fov: 30 }}
          >
            <SheetProvider sheet={rohanSheet}>
              <Environment preset="sunset" />
              <e.group theatreKey="rohan" position={[0, -20, -10]} scale={[15, 15, 15]} rotation={[Math.PI / 2, 0, 0]}>
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
  const { animation, cursorFollow, scrollAnimation } = props;

  const { nodes, materials } = useGLTF("/models/model.glb");

  const { animations: WalkingAnimation } = useFBX("/animations/Walking.fbx");
  const { animations: PushupAnimation } = useFBX("/animations/PushUp.fbx");
  const { animations: SleepingAnimation } = useFBX("/animations/Sleeping.fbx");
  const { animations: TextingAnimation } = useFBX("/animations/Texting.fbx");
  const { animations: BurpeeAnimation } = useFBX("/animations/Burpee.fbx");

  WalkingAnimation[0].name = "Walk";
  PushupAnimation[0].name = "Pushup";
  SleepingAnimation[0].name = "Sleeping";
  TextingAnimation[0].name = "Texting";
  BurpeeAnimation[0].name = "Burpee";

  const { actions } = useAnimations(
    [WalkingAnimation[0], PushupAnimation[0], SleepingAnimation[0], TextingAnimation[0], BurpeeAnimation[0]],
    modelRef
  );

  useEffect(() => {
    actions["Walk"].play();
  }, [animation, scrollAnimation, cursorFollow, actions]);

  // useEffect(() => {
  //   const handleScroll = debounce(() => {
  //     actions["Burpee"].stop();
  //   }, 100);

  //   const handleScrollStop = debounce(() => {
  //     actions["Burpee"].play();
  //   }, 200);

  //   window.addEventListener("scroll", handleScroll);
  //   window.addEventListener("scroll", handleScrollStop);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("scroll", handleScrollStop);
  //     handleScroll.cancel();
  //     handleScrollStop.cancel();
  //   };
  // }, [actions]);

  return (
    <group {...props} ref={modelRef} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
        <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
        <skinnedMesh
          name="Wolf3D_Outfit_Top"
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Bottom"
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Footwear"
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Body"
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/model.glb");

export default Theatre;
