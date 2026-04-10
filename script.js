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
const secret = wordList[getRandomIntInclusive(0, 29)]
console.log(`DEBUG: A palavra secreta é ${secret}`)
let tentativas = 0
let tentativasList = [] 

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function renderBoard() {
    if (!tentativas) {
        console.log('Insira seu primeiro chute!')
    } else {
        for (let i = 0; i < tentativas; i++) {
            console.log(tentativasList[i])
            console.log(renderGuess(tentativasList[i]))
        }
    }
}

function renderGuess(word) {
    let output = []
    for (let i = 0; i < 5; i++) {
        if (word[i] == secret[i]) {
            output[i] = '🟩'
        } else {
            if (secret.includes(word[i])) {
                output[i] = '🟨'                
            } else {
                output[i] = '⬛'
            }
        }
    }
    return output
}

while (running) {
    renderBoard()
    analyseInput()
}

