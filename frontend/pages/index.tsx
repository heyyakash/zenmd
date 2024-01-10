import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`grid place-items-center h-screen`}
    >
    
<Button size = "lg" variant={"outline"}> Click</Button>
    </main>
  )
}
