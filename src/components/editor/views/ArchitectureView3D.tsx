import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Boxes } from 'lucide-react';

interface Node3DProps {
  position: [number, number, number];
  name: string;
  type: string;
  color: string;
}

const Node3D: React.FC<Node3DProps> = ({ position, name, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Core Node Cube */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.4, 0.7, 0.7]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Wireframe outline */}
        <mesh>
          <boxGeometry args={[1.45, 0.75, 0.75]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Text Label */}
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.25}
          color="#E2E8F0"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
};

const ConnectingLines: React.FC = () => {
  const points: [number, number, number][] = [
    [0, 2.5, 0],   // Load Balancer
    [-2, 1, 0],    // App 1
    [2, 1, 0],     // App 2
    [-2, -1, 0],   // Cache
    [2, -1, 0],    // Queue
    [0, -2.5, 0],  // Database
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...p))
  );

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#4DA3FF" transparent opacity={0.4} />
    </lineSegments>
  );
};

export const ArchitectureView3D: React.FC = () => {
  return (
    <div className="flex-1 h-full overflow-hidden bg-[#080A0D] text-slate-300 flex flex-col font-mono select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between p-3 bg-[#0B0F14] border-b border-[#1C2636]">
        <div className="flex items-center gap-2 text-xs text-[#00D9FF]">
          <Boxes className="w-4 h-4" />
          <span className="font-semibold">system-design.arch</span>
          <span className="text-slate-400">• High-Availability Cluster (3D Isometric Spatial View)</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20 font-mono">
          DRAG TO ROTATE • SCROLL TO ZOOM
        </span>
      </div>

      {/* 3D Scene Viewport */}
      <div className="flex-1 relative w-full h-full">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#00D9FF]">
              Initializing WebGL Infrastructure Scene...
            </div>
          }
        >
          <Canvas camera={{ position: [0, 1, 7], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#F89820" />

            <ConnectingLines />

            {/* Spatial cluster nodes */}
            <Node3D position={[0, 2.5, 0]} name="LOAD BALANCER" type="gateway" color="#6DB33F" />
            <Node3D position={[-2.2, 0.8, 0]} name="APP INSTANCE 1" type="service" color="#F89820" />
            <Node3D position={[2.2, 0.8, 0]} name="APP INSTANCE 2" type="service" color="#F89820" />
            <Node3D position={[-2.8, -1.2, 0]} name="REDIS CLUSTER" type="cache" color="#00D9FF" />
            <Node3D position={[2.8, -1.2, 0]} name="KAFKA BROKER" type="queue" color="#FF5C5C" />
            <Node3D position={[0, -2.4, 0]} name="PRIMARY POSTGRES" type="database" color="#4DA3FF" />

            <OrbitControls
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 4}
              maxDistance={12}
              minDistance={4}
            />
          </Canvas>
        </Suspense>

        {/* HUD Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-3 rounded-lg bg-[#0B0F14]/80 backdrop-blur border border-[#1C2636] text-xs space-y-1.5 pointer-events-none">
          <div className="text-slate-200 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            High Availability Cluster Blueprint
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multi-tier distributed model: Layer 7 load balancer distributing ingress traffic across redundant stateless Spring Boot instances with shared Redis caching and PostgreSQL primary-replica synchronization.
          </p>
        </div>
      </div>
    </div>
  );
};
