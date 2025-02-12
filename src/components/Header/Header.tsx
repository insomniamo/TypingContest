'use client'
import React, { useState, useEffect } from 'react'

import SettingsIcon from '@icons/SettingsIcon'
import WordsIcon from '@icons/WordsIcon'
import TimeIcon from '@icons/TimeIcon'
import QuoteIcon from '@icons/QuoteIcon'
import PunctuationIcon from '@icons/PunctuationIcon'

import Button from '@components/Button/Button'
import Modal from '@components/Modal/Modal'
import "./header.scss"

const Header: React.FC = () => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 720)
  const [selectedMode, setSelectedMode] = useState<'words' | 'time' | 'quotes'>('words')

  function handleMenuOpen(): void {
    setModalOpened((prev) => !prev)
  }

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 720
      setIsMobile(mobile)

      if (!mobile) {
        setModalOpened(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const thirdBlockButtons = {
    words: ['10', '25', '50', '100'],
    time: ['15', '30', '60', '120'],
    quotes: ['Короткие', 'Средние', 'Длинные', 'Очень длинные'],
  }[selectedMode]

  const menuContent = (
    <>
      <div className='header__menu'>
        <Button buttonText='Пунктуация' style={[isModalOpened ? "modal" : "simple", "active"]}>
          {!isModalOpened && <PunctuationIcon />}
        </Button>
      </div>
      <div className='header__devider' />
      <div className='header__menu'>
        <Button buttonText='Слова' style={[isModalOpened ? "modal" : "simple"]} onClickEvent={() => setSelectedMode('words')}>
          {!isModalOpened && <WordsIcon />}
        </Button>
        <Button buttonText='Время' style={[isModalOpened ? "modal" : "simple"]} onClickEvent={() => setSelectedMode('time')}>
          {!isModalOpened && <TimeIcon />}
        </Button>
        <Button buttonText='Предложения' style={[isModalOpened ? "modal" : "simple"]} onClickEvent={() => setSelectedMode('quotes')}>
          {!isModalOpened && <QuoteIcon />}
        </Button>
      </div>
      <div className='header__devider' />
      <div className='header__menu'>
        {thirdBlockButtons.map((text) => (
          <Button key={text} buttonText={text} style={[isModalOpened ? "modal" : "simple"]} />
        ))}
      </div>
    </>
  )

  return (
    <header className='header'>
      {isMobile ? (
        <>
          <Button buttonText='Меню настроек' style={["rounded"]} onClickEvent={handleMenuOpen}>
            <SettingsIcon />
          </Button>
          <Modal isOpen={isModalOpened} onClose={() => setModalOpened(false)}>
            <div className='header__column'>{menuContent}</div>
          </Modal>
        </>
      ) : (
        <div className='header__row'>{menuContent}</div>
      )}
    </header>
  )
}

export default Header
