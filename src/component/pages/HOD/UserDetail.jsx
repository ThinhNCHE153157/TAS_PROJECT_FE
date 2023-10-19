import React from 'react'
import TextInput from '../common/TextField'

export default function Userdetail() {
  const handleOnchange = (e) => {
    console.log(e)
  }
  return (
    <div>
      <TextInput onChange={handleOnchange} name='a' value='b' id='c' />
    </div>
  )
}
