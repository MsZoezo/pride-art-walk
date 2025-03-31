"use client"

import Map from '@/components/map'
import { useMemo } from 'react'

export default function Home() {
  const mapContent = [
    {
      position: [52.22, 55.22],
      content: 'nice'
    },
    {
      position: [55.22, 51.22],
      content: 'nice'
    },
    {
      position: [55.22, 52.22],
      content: 'nice'
    },
  ]
  return (
    <Map markers={mapContent}></Map>
  )
}