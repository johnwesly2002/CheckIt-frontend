import React from 'react'

export default function Status({text, icon:Icon, bg, color}) {
  return (
    <div className={`${bg} ${color} px-3 py-2 font-semibold rounded flex items-center gap-1`}>
        {text} <Icon size={15} />
    </div>
  )
}
