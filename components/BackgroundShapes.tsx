import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = ({ position, color, type, speed }: { position: [number, number, number], color: string, type: 'torus' | 'sphere' | 'icosa', speed: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    // Random rotation offset
    const rotSpeed = useRef({
        x: Math.random() * 0.01 * speed,
        y: Math.random() * 0.01 * speed,
    });

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotSpeed.current.x;
            meshRef.current.rotation.y += rotSpeed.current.y;
        }
    });

    let geometry;
    switch(type) {
        case 'torus':
            geometry = <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />;
            break;
        case 'sphere':
            geometry = <sphereGeometry args={[0.8, 32, 32]} />;
            break;
        case 'icosa':
            geometry = <icosahedronGeometry args={[0.9, 0]} />;
            break;
    }

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {geometry}
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.1} 
                    metalness={0.1} 
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

export const BackgroundShapes: React.FC = () => {
  return (
    <group position={[0, 0, -4]}>
        {/* Left Side */}
        <AbstractShape position={[-3, 2, 0]} color="#FF3366" type="torus" speed={2} />
        <AbstractShape position={[-4, -2, -1]} color="#3366FF" type="icosa" speed={1.5} />
        
        {/* Right Side */}
        <AbstractShape position={[3, -1, 0]} color="#00FF99" type="torus" speed={2.2} />
        <AbstractShape position={[4, 3, -2]} color="#FF9933" type="sphere" speed={1.8} />
        
        {/* Center Deep */}
        <AbstractShape position={[0, 0, -3]} color="#CC33FF" type="icosa" speed={0.8} />
    </group>
  );
};