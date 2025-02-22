'use client'
import React from 'react'
import "./footer.scss"

import { RootState } from '@utils/redux/store'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import LinkAway from '@components/LinkAway/LinkAway'
import GitHubIcon from '@icons/GitHubIcon'
import TelegramIcon from '@icons/TelegramIcon'
import VkIcon from '@icons/VkIcon'

function Footer() {
    const { testFocused } = useSelector((state: RootState) => state.typingGame);

    return (
        <motion.footer
        className='footer'
        initial={{ opacity: 1 }}
        animate={testFocused ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        >
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
        </motion.footer>
    )
}

export default Footer