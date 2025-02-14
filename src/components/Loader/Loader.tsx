import React from 'react'
import "./loader.scss"
import RestartIcon from '@icons/RestartIcon'

function Loader() {
  return (
    <div className='loader'>
        <RestartIcon className='loader__icon'/>
    </div>
  )
}

export default Loader