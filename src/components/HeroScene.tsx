"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PETAL_COLORS = [
  "#e8a4bc",
  "#d4789a",
  "#f5e0ec",
  "#ebb4c8",
  "#c9648a",
  "#f0c8d8",
];

function createPetalShape(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.5);
  shape.quadraticCurveTo(0.32, 0.32, 0.32, 0);
  shape.quadraticCurveTo(0.32, -0.22, 0, -0.3);
  shape.quadraticCurveTo(-0.32, -0.22, -0.32, 0);
  shape.quadraticCurveTo(-0.32, 0.32, 0, 0.5);
  return new THREE.ShapeGeometry(shape, 10);
}

type PetalData = {
  position: [number, number, number];
  initRotation: [number, number, number];
  scale: number;
  color: string;
  spinSpeed: number;
  driftAmp: number;
  driftFreq: number;
  driftPhase: number;
  opacity: number;
};

function Petals() {
  const geometry = useMemo(() => createPetalShape(), []);

  const petals = useMemo<PetalData[]>(() => {
    // Deterministic pseudo-random to avoid hydration drift
    const s = (n: number) => ((n * 7919 + 13) % 1000) / 1000;
    return Array.from({ length: 22 }, (_, i) => ({
      position: [
        (s(i * 3) - 0.5) * 5.2,
        (s(i * 3 + 1) - 0.5) * 4.2,
        (s(i * 3 + 2) - 0.5) * 2.0,
      ] as [number, number, number],
      initRotation: [
        s(i * 5) * Math.PI * 2,
        s(i * 5 + 1) * Math.PI * 2,
        s(i * 5 + 2) * Math.PI * 2,
      ] as [number, number, number],
      scale: 0.12 + s(i * 7) * 0.19,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      spinSpeed: (s(i * 11) - 0.5) * 0.024,
      driftAmp: 0.18 + s(i * 13) * 0.32,
      driftFreq: 0.22 + s(i * 17) * 0.42,
      driftPhase: s(i * 19) * Math.PI * 2,
      opacity: 0.6 + s(i * 23) * 0.35,
    }));
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    petals.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      mesh.rotation.z += p.spinSpeed;
      mesh.position.x = p.position[0] + Math.sin(t * p.driftFreq + p.driftPhase) * p.driftAmp;
      mesh.position.y = p.position[1] + Math.cos(t * p.driftFreq * 0.7 + p.driftPhase) * p.driftAmp * 0.6;
    });
  });

  return (
    <>
      {petals.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          geometry={geometry}
          position={p.position}
          rotation={p.initRotation}
          scale={p.scale}
        >
          <meshStandardMaterial
            color={p.color}
            side={THREE.DoubleSide}
            transparent
            opacity={p.opacity}
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
      ))}
    </>
  );
}

function Branch() {
  const branchCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.2, -2.5, -0.5),
    new THREE.Vector3(-1.4, -1.2, 0),
    new THREE.Vector3(-0.4, 0, 0.2),
    new THREE.Vector3(0.3, 0.7, 0),
    new THREE.Vector3(1.2, 0.2, -0.2),
    new THREE.Vector3(2.1, -0.8, 0.1),
  ]), []);

  const sub1Curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0, 0.2),
    new THREE.Vector3(-0.15, 0.9, 0.4),
    new THREE.Vector3(0.2, 1.7, 0.1),
  ]), []);

  const sub2Curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.3, 0.7, 0),
    new THREE.Vector3(0.7, 1.35, -0.1),
    new THREE.Vector3(1.0, 2.0, 0.1),
  ]), []);

  const mainGeom = useMemo(() => new THREE.TubeGeometry(branchCurve, 32, 0.055, 8, false), [branchCurve]);
  const sub1Geom = useMemo(() => new THREE.TubeGeometry(sub1Curve, 12, 0.03, 6, false), [sub1Curve]);
  const sub2Geom = useMemo(() => new THREE.TubeGeometry(sub2Curve, 12, 0.025, 6, false), [sub2Curve]);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1f0c10",
    roughness: 0.92,
    metalness: 0.0,
  }), []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.38) * 0.012 + Math.sin(t * 0.87) * 0.006;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={mainGeom} material={mat} />
      <mesh geometry={sub1Geom} material={mat} />
      <mesh geometry={sub2Geom} material={mat} />
    </group>
  );
}

function SceneRoot({
  mxRef,
  myRef,
}: {
  mxRef: React.MutableRefObject<number>;
  myRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mxRef.current * 0.18,
      0.035
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      myRef.current * 0.12,
      0.035
    );
    groupRef.current.position.y = Math.sin(t * 0.22) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Branch />
      <Petals />
    </group>
  );
}

export default function HeroScene() {
  const mx = useRef(0);
  const my = useRef(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.current = (e.clientX - rect.left) / rect.width - 0.5;
    my.current = (e.clientY - rect.top) / rect.height - 0.5;
  };

  const handlePointerLeave = () => {
    mx.current = 0;
    my.current = 0;
  };

  return (
    <div
      className="h-full w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color="#fff0f5" />
        <directionalLight position={[3, 5, 4]} intensity={1.3} color="#ffffff" />
        <directionalLight position={[-3, -2, -2]} intensity={0.45} color="#d4789a" />
        <pointLight position={[0, 2, 3]} intensity={0.9} color="#ebb4c8" />
        <SceneRoot mxRef={mx} myRef={my} />
      </Canvas>
    </div>
  );
}
