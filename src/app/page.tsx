"use client"

import Map from '@/components/map'

import Navigation from '@/components/navigation/navigation'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { getExhibitions } from '@/util/fetch/map/exhibitions';
import { Exhibition } from '@/types/Exhibition';
import ExhibitionModal from '@/components/modals/exhibitionModal/exhibitionModal'

export default function Home() {
  const [mapContent, setMapContent] = useState<Exhibition[] | null>(null);
  const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null);
  const [modalOpen, setModal] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMap() {
      const { data } = await getExhibitions();
      setMapContent(data);
    }
    fetchMap();
  }, [])

  const changeModal = (title: string) => {
    if(!mapContent) return;

    const exhibition = mapContent.find(exhibition => exhibition.title === title);

    if(!exhibition) return;

    setCurrentExhibition(exhibition);
    setModal(true);
  }

  return (
    <>
      <Navigation>
        <Link href="/">Home</Link>
        <Link href="/">Expositions</Link>
        <Link href="/">News</Link>
      </Navigation>

      <section>
        {
          mapContent && mapContent.length > 0 && (
            <Map markers={mapContent} zoom={13} onMarkerClick={changeModal}></Map>
          )
        }
        <ExhibitionModal isOpen={modalOpen} setOpen={setModal} exhibition={currentExhibition}/>
      </section>
    </>
  )
}