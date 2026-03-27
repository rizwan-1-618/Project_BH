import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import ScrollRig from './components/ScrollRig.tsx';
import SolarSystem from './components/SolarSystem.tsx';
import CameraRig from './components/CameraRig.tsx';
import PostProcessing from './components/PostProcessing.tsx';
import Overlay from './components/Overlay.tsx';

function App() {
  return (
    <div className="w-full min-h-[500vh] bg-black text-slate-50 selection:bg-white selection:text-black font-sans text-center">
      <Overlay />
      <ScrollRig>
        <div className="fixed top-0 left-0 w-full h-screen">
          <Canvas
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 80], fov: 45 }}
          >
            <Suspense fallback={null}>
              <SolarSystem />
              <CameraRig />
              <PostProcessing />
            </Suspense>
          </Canvas>
        </div>
      </ScrollRig>
    </div>
  );
}

export default App;
