import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'
import Model from './Model'
import { OrbitControls, useDetectGPU } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

const App = () => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    gamma: null,
    beta: null
  })
  const ref = useRef()

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
      {/* <div style={{ position: 'absolute', top: 0, color: '#fff', zIndex: 10 }}>
        <h3>gamma: {orientation.gamma}</h3>
        <h3>alpha: {orientation.alpha}</h3>
        <h3>beta: {orientation.beta}</h3>
      </div> */}
      <Canvas camera={{ position: [-5, 2, 15], fov: 30 }}>
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <ambientLight />
        <Suspense fallback={null}>
          <Model boxRef={ref} />
        </Suspense>
        {/* <OrbitControls /> */}
        <HiddenBox orientation={orientation} ref={ref} />

        {/* <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.03} bokehScale={1.5} height={480} />
        </EffectComposer> */}

        {/* <directionalLight position={[10, 10, 0]} intensity={1.5} />
    <directionalLight position={[-10, 10, 5]} intensity={1} />
    <directionalLight position={[-10, 20, 0]} intensity={1.5} />
    <directionalLight position={[0, -10, 0]} intensity={0.25} /> */}
      </Canvas>
    </Suspense>
  )
}

const HiddenBox = React.forwardRef((props, ref) => {
  useFrame(({ mouse }) => {
    const vec2 = new THREE.Vector3(Math.round(mouse.x * 15), 2, Math.round(mouse.y * -15))
    ref.current.position.lerp(vec2, 0.08)
    // ref.current.position.x = (ref.current.position.x - mouse.x * 10 + mouse.y * 6) * 0.05
    // ref.current.position.z = (ref.current.position.z - mouse.y * 10) * 0.05
  })

  return (
    <group ref={ref}>
      <pointLight position={[0, 2, -6]} intensity={1} color="#fff" />
      <mesh>
        <sphereBufferGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
})

export default App
