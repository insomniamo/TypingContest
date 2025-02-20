import React from 'react'
import "./focuswarning.scss"

import CursorIcon from '@icons/CursorIcon'

function FocusWarning() {
  return (
    <div className='focus'>
        <div className='focus__icon'>
            <CursorIcon/>
        </div>
        <span>Кликните сюда или нажмите на любую кнопку для продолжения</span>
    </div>
  )
}

export default FocusWarning