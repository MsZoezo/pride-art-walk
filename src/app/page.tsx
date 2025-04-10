"use client"

import Map from '@/components/map'
import Navigation from '@/components/navigation/navigation'
import Link from 'next/link'
import { useMemo } from 'react'

export default function Home() {
  const mapContent = [
    {
      position: [52.3944447, 4.8357725],
      content: 'Locatie 1'
    },
    {
      position: [52.3855491, 4.876251],
      content: 'Locatie 2'
    },
    {
      position: [52.3605599, 4.8813251],
      content: 'Locatie 3'
    },
  ]

  return (
    <>
      <Navigation>
        <Link href="/">Home</Link>
        <Link href="/">Expositions</Link>
        <Link href="/">News</Link>
      </Navigation>

      <Map markers={mapContent}></Map>
    </>
  )
}