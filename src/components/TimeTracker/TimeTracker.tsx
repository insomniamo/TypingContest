import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@utils/redux/store';
import { setGameActive, setTestFocused } from '@utils/redux/slices/typingGameSlice';
import { motion } from 'framer-motion'
import './timetracker.scss';

function TimeTracker() {
    const dispatch = useDispatch();
    const { gameActive, testFocused } = useSelector((state: RootState) => state.typingGame);
    const { mode, secondsAmount } = useSelector((state: RootState) => state.settings);

    const [timeLeft, setTimeLeft] = useState(secondsAmount);

    // Запустить игру
    useEffect(() => {
        if (gameActive === "true" && mode === 'time') {
            const interval = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [gameActive, mode, secondsAmount]);

    // Завершить игру по окончанию таймера
    useEffect(() => {
        if (timeLeft === 0 && gameActive === "true" && mode === "time") {
            dispatch(setGameActive("false"));
            dispatch(setTestFocused(false));
        }
    }, [timeLeft, gameActive, dispatch, secondsAmount, mode]);

    // Обновить таймер при переходе игры в standby
    useEffect(() => {
        if (gameActive === "standby"){
            setTimeLeft(secondsAmount);
        }
    }, [timeLeft, gameActive, secondsAmount])

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <motion.div
        className='timer'
        initial={{ opacity: 0 }}
        animate={gameActive === "true" && testFocused ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        >
            <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
        </motion.div>
    );
}

export default TimeTracker;
