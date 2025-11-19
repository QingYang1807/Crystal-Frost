import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FrostedCard: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Animation loop for tilt interaction
  useFrame((state) => {
    if (!meshRef.current) return;

    const { x, y } = state.pointer;
    
    // Smoothly interpolate rotation based on mouse position
    // The multipliers (0.4, 0.3) control the intensity of the tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -y * 0.4,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.4,
      0.1
    );
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={1.5}>
        <group ref={meshRef}>
        {/* The Glass Geometry */}
        <RoundedBox args={[3.5, 2.2, 0.1]} radius={0.15} smoothness={4}>
            <meshPhysicalMaterial
            // Key Transmission Properties
            transmission={1} // Full transmission (glass-like)
            thickness={2} // Volume thickness for refraction calculation
            roughness={0.4} // Frosted surface texture
            
            // Standard PBR Properties
            envMapIntensity={1.5} // Strong reflections from environment
            clearcoat={0.8} // Shiny outer layer
            clearcoatRoughness={0.1}
            ior={1.5} // Index of Refraction for glass
            chromaticAberration={0.06} // Slight color splitting at edges
            color="#ffffff"
            attenuationColor="#ffffff"
            attenuationDistance={0.5}
            />
        </RoundedBox>

        {/* Inner Border/Content to give the card some structure */}
        <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[3.2, 1.9]} />
            <meshBasicMaterial 
                color="white" 
                transparent 
                opacity={0.05} 
                side={THREE.DoubleSide}
            />
        </mesh>
        
        {/* Floating Text Elements inside/on the glass */}
        <Text
            position={[-1.2, 0.6, 0.07]}
            fontSize={0.15}
            color="white"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
            PLATINUM
        </Text>
        
        <Text
            position={[-0.85, 0, 0.07]}
            fontSize={0.3}
            color="white"
            fontWeight="bold"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
            4000 1234 5678
        </Text>

        <group position={[1.2, -0.7, 0.07]}>
            <mesh>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
            </mesh>
            <mesh position={[-0.25, 0, 0.01]}>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
            </mesh>
        </group>
        </group>
    </Float>
  );
};