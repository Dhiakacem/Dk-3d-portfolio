import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import modelUrl from "../../assets/models/computer.glb?url";
function Computer() {
  const { scene } = useGLTF(modelUrl, false, true);
  return <>
    <hemisphereLight intensity={0.45} groundColor="black" />
    <directionalLight position={[-20, 50, 10]} intensity={1.2} />
    <pointLight intensity={0.8} />
    <primitive object={scene} scale={0.75} position={[0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
  </>;
}
export default function ComputersCanvas() {
  return <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [20, 3, 5], fov: 25 }}>
    <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    <Computer />
  </Canvas>;
}
