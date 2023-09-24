import React, { useContext, useEffect, useState } from "react"
import { Toastify } from "toastify-js";
import "toastify-js/src/toastify.css"

const GameContext = React.createContext();

export const useGame = () => {
    return useContext(GameContext)
}

export const GameProvider = ({ children }) => {

    const words = ["MANZANA", "PELOTA", "GUITARRA", "RIO", "AVION", "CAFE", "MONTAÑA", "RELOJ", "LUNA", "PERRO", "VELA", "TREN",
        "PIANO", "LLAVE", "PIZZA", "JIRAFA", "SOL", "LIBRO", "ZAPATO", "CHOCOLATE", "CAMISA", "TELEFONO", "MARIPOSA",
        "LAPIZ", "CARRO", "HELADO", "PESCADO", "ARBOL", "SOMBRERO", "PAJARO", "CAMA", "BOLSA", "GATO", "CAMION",
        "CIELO", "ESCALERA", "COMPUTADORA", "CALCETIN", "FLORES", "NUBE", "PLAYA", "BUFANDA", "TAZA", "PANTALON",
        "RELOJ DE ARENA", "COCINA", "TRENZA", "PARAGUAS", "MAPA", "DELFIN"]
    const hints = ["Fruta de color rojo o verde.",
        "Objeto redondo utilizado en muchos deportes.",
        "Instrumento musical con cuerdas.",
        "Cuerpo de agua que fluye por la tierra.",
        "Medio de transporte que vuela en el aire.",
        "Bebida caliente que te despierta por la mañana.",
        "Gran elevación en la tierra.",
        "Reloj de pulsera o pared que muestra la hora.",
        "Astro que brilla en el cielo por la noche.",
        "Animal de compañía que lad...",
        "Se enciende para dar luz en la oscuridad.",
        "Medio de transporte que viaja sobre rieles.",
        "Instrumento musical de teclas.",
        "Sirve para abrir cerr...",
        "Comida redonda y deliciosa.",
        "Animal de cuello largo.",
        "Fuente de luz natural durante el día.",
        "Contiene historias e información.",
        "Lo usas para cubrir tus pies.",
        "Dulce que viene en muchas variedades.",
        "Prenda de vestir para el torso.",
        "Dispositivo de comunicación.",
        "Insecto con alas hermosas.",
        "Instrumento de escr...",
        "Medio de transporte terrestre.",
        "Postre frío y delicioso.",
        "Alimento que vive en el agua.",
        "Planta grande en la naturaleza.",
        "Se pone en la cabeza para protegerse del . . .",
        "Ave que vuela en el cielo.",
        "Mueble para dor...",
        "Contenedor para llevar cosas.",
        "Animal de compañía que suele ser inde...",
        "Vehículo grande para transportar ca...",
        "Lo ves sobre ti durante el d...",
        "Objeto para subir o bajar.",
        "Máquina que procesa inform...",
        "Ropa para los pies.",
        "Plantas con colores bonitos.",
        "Nubes juntas en el cielo.",
        "Lugar donde se encuentra la arena y el mar.",
        "Prenda para el cuello en invierno.",
        "Usada para beber líquidos calientes.",
        "Ropa para las piernas.",
        "Reloj que mide el tiempo de manera especial.",
        "Lugar para preparar com...",
        "Tipo de peinado.",
        "Te protege de la llu...",
        "Muestra lugares en un dibujo.",
        "Mamífero marino inteligente."
    ]

    const [incorrectGuesses, setIncorrectGuesses] = useState(6)
    const [targetWord, setTargetWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [guessedWord, setGuessedWord] = useState()
    const [hint, setHint] = useState("");
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
                // Puedes mostrar un mensaje de victoria o reiniciar el juego aquí
            }
        } else {

            setIncorrectGuesses(incorrectGuesses - 1);

        }
        if (incorrectGuesses  == 0) {
            alert('Perdiste '+targetWord)
            setWin(true)
            // El jugador ha perdido, puedes mostrar un mensaje de derrota aquí
            // y reiniciar el juego si lo deseas
        }
    }
    useEffect(() => {
        setIncorrectGuesses(6)
        setNewTargetWord();
        setGuessedLetters([])
        setGuessedWord([])


    }, [win])

    const setNewTargetWord = () => {
        // Choose a random word and hint from the availableWords array
        const randomIndex = Math.floor(Math.random() * words.length);
        const newWord = words[randomIndex];
        const newWordHint = hints[randomIndex]; // You can add hints here if you have a corresponding array of hints

        const newGuessedWord = '_'.repeat(newWord.length);

        setTargetWord(newWord);
        setHint(newWordHint);
        setGuessedLetters(newGuessedWord);

    };


    return <GameContext.Provider value={{
        incorrectGuesses,
        targetWord,
        guessedWord,
        guessedLetters,
        hint,
        win,
        guess,
        setNewTargetWord
    }}>{children}</GameContext.Provider>

}
