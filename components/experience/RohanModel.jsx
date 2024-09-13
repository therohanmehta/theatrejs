"use client";
import { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
export function RohanModel(props) {
  const modelRef = useRef();
  const { animation } = props;
  const { cursorFollow } = props;
  const { scrollAnimation } = props;

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
    [
      WalkingAnimation[0],
      PushupAnimation[0],
      SleepingAnimation[0],
      TextingAnimation[0],
      BurpeeAnimation[0],
    ],
    modelRef
  );

  useEffect(() => {
    if (animation || cursorFollow) {
      if (cursorFollow) {
        actions["Walk"].reset().play();
        return () => {
          // actions["Walk"].stop();
        };
      } else {
        actions[animation].reset().play().fadeIn(0.5);
        // return () => {
        //   actions["Walk"].reset().fadeOut(0.01);
        // };
      }
    }
    if (scrollAnimation) {
      actions[scrollAnimation].reset().play().fadeIn(0.5);
      // return () => {
      //   actions[scrollAnimation].reset().fadeOut(0.01);
      // };
    }
  }, [animation, scrollAnimation]);

  useFrame((state) => {
    if (cursorFollow) {
      const target = new THREE.Vector3(
        state.mouse.x * 7,
        state.mouse.y * 7,
        -5
      );
      modelRef.current.getObjectByName("Head").lookAt(target);
    }
    // if (!cursorFollow) {
    //   modelRef.current.getObjectByName("Head").lookAt(state.camera.position);
    //   // console.log(state.camera.position);
    // }
  });
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
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
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
          morphTargetDictionary={
            nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary
          }
          morphTargetInfluences={
            nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences
          }
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Footwear"
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          morphTargetDictionary={
            nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
          }
          morphTargetInfluences={
            nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
          }
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
