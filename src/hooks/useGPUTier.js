import { getGPUTier } from 'detect-gpu'
import { useEffect, useState } from 'react'

export default function useGPUTier() {
  const [gpuTier, setGpuTier] = useState(null)

  useEffect(() => {
    ;(async () => {
      console.log(await getGPUTier())
      setGpuTier((await getGPUTier()).tier)
    })()
  }, [])

  return gpuTier
}
