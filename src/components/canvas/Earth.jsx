import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import modelUrl from "../../assets/models/earth.glb?url";
function Earth() {
  const { scene } = useGLTF(modelUrl, false, true);
  return <primitive object={scene} scale={2.5} />;
}
export default function EarthCanvas() {
  return <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}>
    <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    <Earth />
  </Canvas>;
}
