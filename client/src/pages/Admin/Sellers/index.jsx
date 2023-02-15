import React, { useRef } from 'react'

function Seller() {
  const d = useRef()
  let data = ""

  function handleName(e) {
    console.log(e.name)
  }

  return (
    <div className='adminPages'>

      <input ref={d} type="file" placeholder='Img' onChange={(e) => handleName(e.target.files[0])} />
    </div>
  )
}

export default Seller