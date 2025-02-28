import React from 'react';
import { RootState } from '@utils/redux/store';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { calculateAccuracy } from "@utils/calculateAccuracy";
import "./showresults.scss";

function ShowResults() {
    const { errorCount, correctWords, gameActive, currentInput, timeSpent } = useSelector((state: RootState) => state.typingGame);
    const { mode, secondsAmount } = useSelector((state: RootState) => state.settings);

    const accuracy = calculateAccuracy(currentInput, errorCount);
    const time = mode === "time" ? secondsAmount : timeSpent;
    const wordsPerMinute = time > 0 ? ((correctWords * 60) / time).toFixed(0) : "0";
    const modeLabel = mode === "time" ? "время" : mode === "words" ? "слова" : "предложения";

    return (
        <motion.div
            className="showresults"
            initial={{ opacity: 0 }}
            animate={gameActive === "false" ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
        >
            <div className="showresults__wrapper">
                <Stat name="ошибки" value={errorCount} />
                <Stat name="правильных слов" value={correctWords} />
            </div>

            <div className="showresults__wrapper">
                <Stat name="точность" value={`${accuracy}%`} />
                <Stat name="слова в минуту" value={wordsPerMinute} />
            </div>

            <div className="showresults__wrapper">
                <Stat name="режим" value={modeLabel} />
                <Stat name="секунд" value={time} />
            </div>
        </motion.div>
    );
}

const Stat = ({ name, value }: { name: string; value: string | number }) => (
    <div className="showresults__stat">
        <span className="showresults__stat-name">{name}</span>
        <span>{value}</span>
    </div>
);

export default ShowResults;
