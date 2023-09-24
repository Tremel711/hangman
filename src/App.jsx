import { useEffect, useState } from 'react'
import './App.css'
import { LetterButton } from './Components/LetterButton'
import { Stack } from 'react-bootstrap'
import { useGame } from './Context/GameContext'
import { Underscore } from './Components/Underscore'


function App() {
  const { targetWord, guessedLetters, hint, guess, guessedWord, setNewTargetWord, incorrectGuesses } = useGame()

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  useEffect(() => {
    setNewTargetWord();

  }, []);

  const [hintStatus, setHintStatus] = useState(true)
  return (
    <>
      <button onClick={() => { setHintStatus(false) }}>Hint</button>
      <div>
        {incorrectGuesses}
      </div>
      {!hintStatus && (<div>
        {hint}
      </div>)}

      {targetWord.length}
      <Stack direction='horizontal'>
        <Underscore word={guessedWord} />
      </Stack>

      <Stack direction='horizontal'>
        {
          letters.map(letter => (
            <LetterButton
              key={letter} // You should provide a unique key when mapping over components
              value={letter}
              onClick={() => guess(letter)} // You should call the guess function with the letter
            />
          ))
        }
      </Stack>
    </>
  )
}

export default App
