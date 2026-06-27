"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ribbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -1.6, -2),
      new THREE.Vector3(-4, -0.4, 0),
      new THREE.Vector3(-1, 0.8, 0.5),
      new THREE.Vector3(2, 0.2, 0),
      new THREE.Vector3(6, -0.6, -1),
      new THREE.Vector3(10, -1.8, -2),
    ]);
    return new THREE.TubeGeometry(curve, 120, 0.55, 16, false);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.z = Math.sin(t * 0.12) * 0.06;
    meshRef.current.position.y = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#c9a454"
        roughness={0.18}
        metalness={0.6}
        envMapIntensity={0}
      />
    </mesh>
  );
}

function SecondaryRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0.6, -3),
      new THREE.Vector3(-3, 1.4, -0.5),
      new THREE.Vector3(0, 0.6, 0.8),
      new THREE.Vector3(4, -0.2, -0.2),
      new THREE.Vector3(10, 0.4, -2),
    ]);
    return new THREE.TubeGeometry(curve, 100, 0.28, 12, false);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.z = Math.sin(t * 0.1 + 1.5) * 0.04;
    meshRef.current.position.y = Math.cos(t * 0.15) * 0.06;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#7a5c15"
        roughness={0.25}
        metalness={0.4}
        opacity={0.75}
        transparent
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 5]} intensity={3.0} color="#fff4e8" />
      <directionalLight position={[-5, -3, -4]} intensity={1.2} color="#c9a454" />
      <pointLight position={[0, 4, 5]} intensity={2.0} color="#e8c87a" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#ffffff" />
      <Ribbon />
      <SecondaryRibbon />
    </>
  );
}

export default function RibbonScene() {
  return (
    <div className="w-full h-[50vh] -my-16 relative z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
