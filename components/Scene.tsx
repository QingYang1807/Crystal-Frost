import React from 'react';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { BackgroundShapes } from './BackgroundShapes';
import { FrostedCard } from './FrostedCard';

export const Scene: React.FC = () => {
  return (
    <>
      {/* HDRI Environment for realistic reflections on the glass */}
      <Environment preset="warehouse" />
      
      {/* Ambient Light for base visibility */}
      <ambientLight intensity={0.4} />
      
      {/* Directional light to cast shadows and highlights */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
      />

      {/* The moving background objects */}
      <BackgroundShapes />

      {/* The main Hero object: The Glass Card */}
      <FrostedCard />

      {/* Shadows to ground the floating card slightly */}
      <ContactShadows 
        position={[0, -3, 0]} 
        opacity={0.5} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />

      {/* Optional controls for debugging, restricted for the intended 'card' effect experience */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2 - 0.2} 
        maxPolarAngle={Math.PI / 2 + 0.2}
        minAzimuthAngle={-0.2}
        maxAzimuthAngle={0.2}
      />
    </>
  );
};