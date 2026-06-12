'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useStableReducedMotion() {
  const shouldReduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && shouldReduce
}
