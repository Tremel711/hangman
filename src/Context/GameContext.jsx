import React, { useContext, useEffect, useState } from "react"
import { Toastify } from "toastify-js";
import "toastify-js/src/toastify.css"
import { words,hints,themes } from "../public/words";

const GameContext = React.createContext();

export const useGame = () => {
    return useContext(GameContext)
}

export const GameProvider = ({ children }) => {
   
    const [incorrectGuesses, setIncorrectGuesses] = useState(6)
    const [targetWord, setTargetWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [guessedWord, setGuessedWord] = useState("")
    const [hint, setHint] = useState("");
    const [theme, setTheme] = useState("")
    const [win, setWin] = useState(false)

    const guess = (letter) => {
        console.log('aca paso');
        if (guessedLetters.includes(letter)) {
            // Si la letra ya se adivinó, no hagas nada
            return;
        }
        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);



        if (targetWord.includes(letter)) {
            // Si la letra está en la palabra objetivo, actualizar la palabra adivinada
            const newGuessedWord = targetWord
                .split('')
                .map((char) => (newGuessedLetters.includes(char) ? char : '_'))
                .join('');
            setGuessedWord(newGuessedWord);

            if (newGuessedWord === targetWord) {
                // El jugador ha ganado
                alert('Ganaste Siuuu');
                setWin(true);
            }
        } else {

            setIncorrectGuesses(incorrectGuesses - 1);

        }
        if (incorrectGuesses === 0 && !win) {
            alert('Perdiste la palabra era ' + targetWord)
            setWin(true)
            // El jugador ha perdido
        }
    }
    useEffect(() => {
        setNewTargetWord();
    }, [win])

    const setNewTargetWord = () => {
        // Choose a random word and hint from the availableWords array
        const randomIndex = Math.floor(Math.random() * words.length);
        const newWord = words[randomIndex];
        const newWordHint = hints[randomIndex];
        const newWordTheme = themes[randomIndex];

        const newGuessedWord = '_'.repeat(newWord.length);

        setTargetWord(newWord);
        setHint(newWordHint);
        setTheme(newWordTheme);
        setGuessedLetters([]);
        setGuessedWord(newGuessedWord);
        setIncorrectGuesses(6);
        setWin(false);

    };


    return <GameContext.Provider value={{
        incorrectGuesses,
        targetWord,
        guessedWord,
        guessedLetters,
        theme,
        hint,
        win,
        guess,
        setNewTargetWord
    }}>{children}</GameContext.Provider>

}
