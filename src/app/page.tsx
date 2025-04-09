"use client"

import Map from '@/components/map'
import ExhibitionModal from '@/components/exhibitions/exhibitionModal';
import { useEffect, useState } from 'react'
import { getExhibitions } from '@/util/fetch/map/exhibitions';
import { Exhibition } from '@/types/Exhibition';

export default function Home() {
  const [mapContent, setMapContent] = useState<Exhibition[] | null>(null);
  const [modalOpen, setModal] = useState(false)

  useEffect(() => {
    async function fetchMap() {
      const { data } = await getExhibitions();
      setMapContent(data);
    }
    fetchMap();
  }, [])

  const changeModal = () => {
    setModal(!modalOpen);
  }
  
  return (
    <>
      {
        mapContent && mapContent.length > 0 && (
          <Map markers={mapContent} zoom={13} onMarkerClick={changeModal}></Map>
        )
      }
      <ExhibitionModal open={modalOpen}/>
    </>
  )
}