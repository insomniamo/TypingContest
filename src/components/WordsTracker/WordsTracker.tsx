import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@utils/redux/store';
import { setTimeSpent, setTestFocused } from '@utils/redux/slices/typingGameSlice';
import { motion } from 'framer-motion';
import './wordstracker.scss';

function WordsTracker() {
    const dispatch = useDispatch();
    const { gameActive, testFocused, spacesCount, wordsArray, timeSpent } = useSelector((state: RootState) => state.typingGame);
    const { mode } = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        if (gameActive === "true" && (mode === "words" || mode === "quotes")) {
            const interval = setInterval(() => {
                dispatch(setTimeSpent(timeSpent + 1));
            }, 1000);
    
            return () => clearInterval(interval);
        } 
        
        if (gameActive === "false" && (mode === "words" || mode === "quotes")) {
            dispatch(setTestFocused(false));
        }
    }, [gameActive, mode, dispatch, timeSpent]);
    

    return (
        <motion.div
            className="words-tracker"
            initial={{ opacity: 0 }}
            animate={gameActive === "true" && testFocused ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
        >
            <span>{spacesCount}/{wordsArray.length}</span>
        </motion.div>
    );
}

export default WordsTracker;
