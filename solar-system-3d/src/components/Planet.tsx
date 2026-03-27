import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Atmosphere from './Atmosphere.tsx';

interface PlanetProps {
  name: string;
  position: [number, number, number];
  radius: number;
  textureUrl: string;
  hasAtmosphere?: boolean;
  rotationSpeed?: number;
  colorTint?: string;
}

export default function Planet({ position, radius, textureUrl, hasAtmosphere, rotationSpeed = 0.002, colorTint = '#ffffff' }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture(textureUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          color={colorTint}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {hasAtmosphere && <Atmosphere radius={radius * 1.05} />}
    </group>
  );
}
