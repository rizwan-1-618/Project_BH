import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './ScrollRig.tsx';

export default function CameraRig() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5, 40),      // Start facing Sun (t=0)
      new THREE.Vector3(75, 15, 0),     // Arcing towards Mars
      new THREE.Vector3(150, 2, -15),   // Near Mars (t~0.33)
      new THREE.Vector3(110, -5, -25),  // Arcing towards Venus
      new THREE.Vector3(70, -2, -5),    // Near Venus (t~0.66)
      new THREE.Vector3(90, 10, 10),    // Arcing towards Earth
      new THREE.Vector3(110, 2, 35),    // Stop in front of Earth (t=1.0)
    ]);
  }, []);

  const targetCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),       // Look at Sun
      new THREE.Vector3(150, 0, -30),   // Look at Mars
      new THREE.Vector3(70, 0, -20),    // Look at Venus
      new THREE.Vector3(110, 0, 15),    // Look at Earth
    ]);
  }, []);

  useFrame((state) => {
    const t = scrollState.progress || 0;

    const position = curve.getPoint(t);
    state.camera.position.lerp(position, 0.05);

    const lookAtPos = targetCurve.getPoint(t);
    state.camera.lookAt(lookAtPos);
  });

  return null;
}
