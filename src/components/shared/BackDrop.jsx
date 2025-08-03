import React from 'react'

export default function BackDrop({data}) {
  return (
    <div className={`z-20 transition-all duration-200 opacity-40 w-screen h-screen bg-black/80 fixed ${data ? 'top-16' : 'top-0'} left-0`}>

    </div>
  )
}
