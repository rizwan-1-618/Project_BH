import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={2.0} 
        luminanceSmoothing={0.9} 
        intensity={3.0} 
        mipmapBlur 
      />
    </EffectComposer>
  );
}
