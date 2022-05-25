import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Letter } from './Letter'

export default function Model(props) {
  const group = useRef()

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-15, 0, -15]}>
        {Array(1000)
          .fill()
          .map((i, idx) => {
            return <Letter key={idx} boxRef={props.boxRef} idx={idx} />
          })}
      </group>
    </group>
  )
}

useGLTF.preload('/inspiration1.glb')
