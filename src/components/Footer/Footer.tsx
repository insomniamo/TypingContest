import React from 'react'
import "./footer.scss"

import LinkAway from '@components/LinkAway/LinkAway'
import GitHubIcon from '@icons/GitHubIcon'
import TelegramIcon from '@icons/TelegramIcon'
import VkIcon from '@icons/VkIcon'

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__row'>
            <div className='footer__links'>
                <LinkAway linkText='GitHub' link='https://github.com/insomniamo'>
                    <GitHubIcon/>
                </LinkAway>
                <LinkAway linkText='Telegram' link='https://t.me/insomniamo'>
                    <TelegramIcon/>
                </LinkAway>
                <LinkAway linkText='ВКонтакте' link='https://vk.com/warriorfromwar'>
                    <VkIcon/>
                </LinkAway>
            </div>
            <span className='footer__text'>Copyright © 2025 <b>Sergey Demidenko.</b> All rights reserved</span>
        </div>
    </footer>
  )
}

export default Footer