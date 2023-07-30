import { useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import TextInput from '@/components/TextInput'
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
        <TextInput content={content} handleChange={handleChange} />
        <FormattedOutput content={content} />
      </main>
    </>

  )
}
