import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-zinc-950 text-white overflow-hidden">
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-400">
            Crystal Frost
          </h1>
          <p className="text-zinc-400 text-lg font-light tracking-wide">
            Interactive Refraction Synthesis
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center z-10 pointer-events-none">
        <p className="text-zinc-500 text-sm uppercase tracking-widest opacity-60">
          Move cursor to tilt glass
        </p>
      </div>

      {/* 3D Scene Canvas */}
      <Canvas
        dpr={[1, 2]} // Handle high-DPI screens
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="absolute inset-0"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}