const wordList = ["carta", "porta", "vento", "luzer", "pedra",
  "gatos", "casas", "livro", "piano", "trigo",
  "fruta", "prato", "corpo", "dente", "noite",
  "tarde", "sorte", "verde", "bravo", "claro",
  "nuvem", "chuva", "praia", "campo", "flore",
  "festa", "dança", "risos", "amigo", "sonho",
  "força", "lento", "rapaz", "moeda", "valor",
  "tempo", "magia", "raiva", "poder", "sabor",
  "pazez", "ideia", "etica", "honra", "justo"]
let running = 1
//const secret = wordList[getRandomIntInclusive(0, wordList.length - 1)]
const secret = 'carta'
console.log(`DEBUG: A palavra secreta é ${secret}`)
let tentativas = 0
let tentativasList = [] 
const keyboardState = {}
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

for (let letter of alphabet) {
    keyboardState[letter] = "⬜"
}

const board = document.getElementById('board')

for (let i = 0; i < 6; i++) {
    let row = document.createElement('div')
    row.classList.add('row')
    for (let j = 0; j < 5; j++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        row.appendChild(cell)
    }
    board.appendChild(row)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function renderBoard() {
    console.clear()
    if (!tentativas) {
        console.log('Insira seu primeiro chute!')
    } else {
        for (let i = 0; i < tentativas; i++) {
            console.log(tentativasList[i])
            console.log(renderGuess(tentativasList[i]))
            renderKeyboard()
        }
    }
}

function renderGuess(word) {
    let result = Array(5).fill('⬛')
    let secretCopy = secret.split('')
    for (let i = 0; i < 5; i++) {
        if (word[i] === secret[i]) {
            result[i] = '🟩'
            secretCopy[i] = null
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === '⬛') {
            let index = secretCopy.indexOf(word[i])

            if (index !== -1) {
                result[i] = '🟨'
                secretCopy[index] = null
            }
        }
    }

    return result
}


function analyseInput() {
    let guess = prompt('Digite a palavra (5 letras:)').toLowerCase()
    if (!guess) return
    if (guess.length != 5) return
    if (guess === secret) {
        alert('Parabéns, você acertou a palavra secreta!')
        running = false
    } else {
        tentativasList[tentativas] = guess
        tentativas ++
    }
    let result = renderGuess(guess)
    updateKeyboard(guess, result)
}

function updateKeyboard(word, result) {
    for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        const status = result[i]

        if (status === '🟩') {
            keyboardState[letter] = '🟩'
        } else if (status === '🟨' && keyboardState[letter] != '🟩') {
            keyboardState[letter] = '🟨'
        } else if (keyboardState[letter] != '🟨' && keyboardState[letter] != '🟩' && keyboardState[letter] == '⬜') {
            keyboardState[letter] = '⬛'
        }
    }
}

function renderKeyboard() {
    const row1 = "qwertyuiop"
    const row2 = "asdfghjkl"
    const row3 = "zxcvbnm"

    function renderRow(row) {
        let output = ""
        for (let letter of row) {
            output += keyboardState[letter] + " "
        }
        console.log(output)
    }

    console.log("\nTeclado:")
    renderRow(row1)
    renderRow(row2)
    renderRow(row3)
}

while (running) {
    renderBoard()
    analyseInput()
}

