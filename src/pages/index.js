import { useState } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import FormattedOutput from '@/components/FormattedOutput'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [content, setContent] = useState('')
  console.log(content)

  function handleChange(input) {
    console.log(input)
    setContent(input);
  };

  return (
    <>
      <Navbar />
      <main
        className={`flex py-2 px-24 ${inter.className}`}
      >
        <FormattedOutput id="output" content={content} />
      </main>
    </>

  )
}
