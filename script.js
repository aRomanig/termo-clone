const wordList = ["carta", "porta", "vento", "luzer", "pedra",
  "gatos", "casas", "livro", "piano", "trigo",
  "fruta", "prato", "corpo", "dente", "noite",
  "tarde", "sorte", "verde", "bravo", "claro",
  "nuvem", "chuva", "praia", "campo", "flore",
  "festa", "dança", "risos", "amigo", "sonho",
  "força", "lento", "rapaz", "moeda", "valor",
  "tempo", "magia", "raiva", "poder", "sabor",
  "pazez", "ideia", "etica", "honra", "justo"]
const secret = wordList[getRandomIntInclusive(0, wordList.length - 1)]
 //const secret = 'carta'
console.log(`DEBUG: A palavra secreta é ${secret}`)
let tentativas = 0
let gameEnded = 0
let tentativasList = [] 
const keyboardState = {}
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const input = document.getElementById('guessInput')

for (let letter of alphabet) {
    keyboardState[letter] = "w"
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
    const rowList = document.querySelectorAll('.row')
    for (let i = 0; i < tentativas; i++) {
        let cellList = rowList[i].children
        let tentativaSplit = tentativasList[i].split('')
        let result = renderGuess(tentativasList[i])
        for (let j = 0; j < 5; j++) {
            cellList[j].textContent = tentativaSplit[j]
            switch (result[j]) {
                case 'g':
                    cellList[j].classList.remove('yellow', 'gray')
                    cellList[j].classList.add('green', 'filled')
                    break;
                case 'y':
                    cellList[j].classList.remove('green', 'gray')
                    cellList[j].classList.add('yellow', 'filled')
                    break;
                case 'b':
                    cellList[j].classList.remove('green', 'yellow')
                    cellList[j].classList.add('gray', 'filled')
                    break;
            }
        }
    }
}

function renderGuess(word) {
    let result = Array(5).fill('b')
    let secretCopy = secret.split('')
    for (let i = 0; i < 5; i++) {
        if (word[i] === secret[i]) {
            result[i] = 'g'
            secretCopy[i] = null
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] === 'b') {
            let index = secretCopy.indexOf(word[i])

            if (index !== -1) {
                result[i] = 'y'
                secretCopy[index] = null
            }
        }
    }

    return result
}


function analyseInput() {
    if (tentativas > 5 || gameEnded) {
        return
    }
    let guess = input.value.trim().toLowerCase()
    if (!guess) return
    if (guess.length != 5) return
    if (guess === secret) {
        tentativasList[tentativas] = guess
        tentativas++
        input.value = ''
        gameEnded = 1
        renderBoard()
        return
    } else {
        tentativasList[tentativas] = guess
        tentativas ++
    }
    let result = renderGuess(guess)
    updateKeyboard(guess, result)
    renderBoard()
    input.value = ''
}

function updateKeyboard(word, result) {
    for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        const status = result[i]

        if (status === 'g') {
            keyboardState[letter] = 'g'
        } else if (status === 'y' && keyboardState[letter] != 'g') {
            keyboardState[letter] = 'y'
        } else if (keyboardState[letter] != 'y' && keyboardState[letter] != 'g' && keyboardState[letter] == 'w') {
            keyboardState[letter] = 'b'
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
    }
    renderRow(row1)
    renderRow(row2)
    renderRow(row3)
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        analyseInput()
    }
    input.focus()
})