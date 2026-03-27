import { Environment, Stars } from '@react-three/drei';
import Sun from './Sun.tsx';
import Planet from './Planet.tsx';

const MOON_TEX = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg";
const EARTH_TEX = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";

export default function SolarSystem() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <Environment preset="city" />
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Sun position={[0, 0, 0]} radius={20} />

      {/* Mercury */}
      <Planet 
        name="Mercury"
        position={[40, 0, 10]} 
        radius={1.5}
        textureUrl={MOON_TEX}
        colorTint="#a8a8a8"
        rotationSpeed={0.005}
      />

      {/* Venus */}
      <Planet 
        name="Venus"
        position={[70, 0, -20]} 
        radius={3}
        textureUrl={MOON_TEX}
        colorTint="#e6c280"
        rotationSpeed={0.003}
        hasAtmosphere={true}
      />

      {/* Earth */}
      <Planet 
        name="Earth"
        position={[110, 0, 15]} 
        radius={3.5}
        textureUrl={EARTH_TEX}
        hasAtmosphere={true}
        rotationSpeed={0.004}
      />

      {/* Mars */}
      <Planet 
        name="Mars"
        position={[150, 0, -30]} 
        radius={2.5}
        textureUrl={MOON_TEX}
        colorTint="#c1440e"
        rotationSpeed={0.003}
      />

      {/* Jupiter */}
      <Planet 
        name="Jupiter"
        position={[220, 0, 40]} 
        radius={12}
        textureUrl={MOON_TEX}
        colorTint="#c88b3a"
        rotationSpeed={0.01}
      />
    </>
  );
}
