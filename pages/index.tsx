import {useSocket} from '@/context/socket'
import { useEffect } from 'react';

export default function Home() {
  const socket: any = useSocket();
  useEffect(()=>{
    socket?.on('connect', ()=>{
      console.log(socket?.id)
    })
  },[])
  return (
    <h1>home</h1>
  )
}
