import Auth from '@/components/Auth'
import Header from '@/components/Header/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Auth />
    </main>
  )
}
