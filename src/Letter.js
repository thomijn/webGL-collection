import { Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import font from './font.json'

export const Letter = ({ idx, boxRef }) => {
  const ref = useRef()

  const [letter, setfirst] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 65).toUpperCase())

  useFrame(({ clock }) => {
    const boxPos = new THREE.Vector3(boxRef.current?.position.x + 15, boxRef.current?.position.y, boxRef.current?.position.z + 15)

    let distance = ref.current?.position.distanceTo(boxPos) / 3

    if (distance < 1) {
      const vec2 = new THREE.Vector3(ref.current.position.x, 1 - distance, ref.current.position.z)
      ref.current.position.lerp(vec2, 0.1)
    } else {
      const vec2 = new THREE.Vector3(ref.current.position.x, 0, ref.current.position.z)
      ref.current.position.lerp(vec2, 0.1)
    }
  })

  //set boxes in columns and rows of 10
  const x = idx % 35
  const z = Math.floor(idx / 35)

  //random color
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  const config = useControls({
    size: 1,
    height: 0.2,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 8
  })

  const boxSize = 1.2

  return (
    <Text3D
      rotation={[Math.PI * -0.5, 0, 0]}
      ref={ref}
      castShadow
      font={font}
      receiveShadow
      {...config}
      position={[x * boxSize, 0, z * boxSize]}>
      {/* <boxBufferGeometry args={[boxSize, boxSize, boxSize]} /> */}
      {letter}
      <meshStandardMaterial color="black" />
    </Text3D>
  )
}
