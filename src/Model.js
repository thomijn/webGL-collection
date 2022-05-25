import React, { useRef } from 'react'
import { useDetectGPU, useGLTF } from '@react-three/drei'
import { Letter } from './Letter'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0')
}

export default function Model(props) {
  const group = useRef()
  const ref = useRef()
  const { nodes, materials } = useGLTF('/inspiration1.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <HiddenBox orientation={props.orientation} ref={ref} />

      <group position={[-15, 0, -15]}>
        {/* <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={nodes.Cube.material} /> */}
        {Array(1000)
          .fill()
          .map((i, idx) => {
            return <Letter boxRef={ref} idx={idx} />
          })}
      </group>
    </group>
  )
}

const HiddenBox = React.forwardRef((props, ref) => {
  useFrame(({ mouse }) => {
    const vec2 = new THREE.Vector3(props.orientation.gamma, 2, 0)
    ref.current.position.lerp(vec2, 0.08)
    // ref.current.position.x = (ref.current.position.x - mouse.x * 10 + mouse.y * 6) * 0.05
    // ref.current.position.z = (ref.current.position.z - mouse.y * 10) * 0.05
  })

  return (
    <group ref={ref}>
      <pointLight position={[0, 2, -6]} intensity={1} color="#fff" />
      <mesh>
        <sphereBufferGeometry args={[0.2, 16, 16]} />
        <meshPhongMaterial color="white" />
      </mesh>
    </group>
  )
})

useGLTF.preload('/inspiration1.glb')
