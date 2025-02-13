'use client'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@utils/redux/store'
import { togglePunctuation, setMode, setWordsAmount, setSecondsAmount, setQuoteLength } from '@utils/redux/slices/settingsSlice'

import SettingsIcon from '@icons/SettingsIcon'
import WordsIcon from '@icons/WordsIcon'
import TimeIcon from '@icons/TimeIcon'
import QuoteIcon from '@icons/QuoteIcon'
import PunctuationIcon from '@icons/PunctuationIcon'

import Button from '@components/Button/Button'
import Modal from '@components/Modal/Modal'
import "./header.scss"

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { punctuation, mode, wordsAmount, secondsAmount, quoteLength } = useSelector((state: RootState) => state.settings)

  const [isModalOpened, setModalOpened] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth <= 720)

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

  const modeOptions = [
    { type: 'words', label: 'Слова', icon: <WordsIcon /> },
    { type: 'time', label: 'Время', icon: <TimeIcon /> },
    { type: 'quotes', label: 'Предложения', icon: <QuoteIcon /> }
  ]

  const thirdBlockOptions = {
    words: ['10', '25', '50', '100'],
    time: ['15', '30', '60', '120'],
    quotes: ['Короткие', 'Средние', 'Длинные', 'Очень длинные'],
  }[mode]

  const menuContent = (
    <>
      <div className='header__menu'>
        <Button
          buttonText='Пунктуация'
          style={isModalOpened 
            ? punctuation ? ["modal", "active"] : ["modal"] 
            : punctuation ? ["simple", "active"] : ["simple"]}
          onClickEvent={() => dispatch(togglePunctuation())}
        >
          {!isModalOpened && <PunctuationIcon />}
        </Button>
      </div>
      <div className='header__devider' />
      <div className='header__menu'>
        {modeOptions.map(({ type, label, icon }) => (
          <Button
            key={type}
            buttonText={label}
            style={isModalOpened 
              ? mode === type ? ["modal", "active"] : ["modal"] 
              : mode === type ? ["simple", "active"] : ["simple"]}
            onClickEvent={() => dispatch(setMode(type as 'words' | 'time' | 'quotes'))}
          >
            {!isModalOpened && icon}
          </Button>
        ))}
      </div>
      <div className='header__devider' />
      <div className='header__menu'>
        {thirdBlockOptions.map((text, index) => {
          const isActive =
            (mode === 'words' && wordsAmount === Number(text)) ||
            (mode === 'time' && secondsAmount === Number(text)) ||
            (mode === 'quotes' && quoteLength === index + 1)

          return (
            <Button
              key={text}
              buttonText={text}
              style={isModalOpened
                ? isActive ? ["modal", "active"] : ["modal"]
                : isActive ? ["simple", "active"] : ["simple"]}
              onClickEvent={() => {
                if (mode === 'words') dispatch(setWordsAmount(Number(text)))
                if (mode === 'time') dispatch(setSecondsAmount(Number(text)))
                if (mode === 'quotes') dispatch(setQuoteLength(index + 1))
              }}
            />
          )
        })}
      </div>
    </>
  )

  return (
    <header className='header'>
      {isMobile ? (
        <>
          <Button buttonText='Меню настроек' style={["rounded"]} onClickEvent={() => setModalOpened(prev => !prev)}>
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
