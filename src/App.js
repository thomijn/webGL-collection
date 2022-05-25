import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import './styles.css'
import Model from './Model'
import { OrbitControls, useDetectGPU } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import useGPUTier from './hooks/useGPUTier'

const App = () => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    gamma: null,
    beta: null
  })

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        setOrientation({
          alpha: e.alpha,
          beta: e.beta,
          gamma: e.gamma
        })
      })
    } else {
      setOrientation({ beta: 'not supported' })
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <div style={{ position: 'absolute', top: 0, color: '#fff', zIndex: 10 }}>
        <h3>gamma: {orientation.gamma}</h3>
        <h3>alpha: {orientation.alpha}</h3>
        <h3>beta: {orientation.beta}</h3>
      </div>
      <Canvas camera={{ position: [-5, 2, 15], fov: 30 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <ambientLight />
        <Suspense fallback={null}>
          <Model orientation={orientation} />
        </Suspense>
        <OrbitControls />

        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.03} bokehScale={1.5} height={480} />
        </EffectComposer>

        {/* <directionalLight position={[10, 10, 0]} intensity={1.5} />
    <directionalLight position={[-10, 10, 5]} intensity={1} />
    <directionalLight position={[-10, 20, 0]} intensity={1.5} />
    <directionalLight position={[0, -10, 0]} intensity={0.25} /> */}
      </Canvas>
    </Suspense>
  )
}

export default App
