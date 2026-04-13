const wordList = [
"abade","abalo","abeto","abono","abrir","acaso","achar","acima","acuso","adiar",
"afago","afiar","agora","agudo","ajuda","alado","algar","algum","aliar",
"aluno","amado","amiga","amigo","ampla","amplo","andar","anexo","antes","apego",
"apoio","apuro","arcar","ardor","areia","armar","aroma","arroz","assar","astro",
"atomo","atual","atuar","audaz","autor","aviao","aviso","axila","bacia","banco",
"barco","barra","beijo","berco","bicho","bloco","bolsa","borda","bravo","breve",
"brisa","burro","caber","cabra","caixa","calma","calor","campo","canal","canto",
"capaz","carga","carro","carta","casal","casca","catar","ceder","censo","cerca",
"certo","chave","cheio","choro","chuva","ciclo","cifra","claro","cobro","coisa",
"colar","comer","conta","coral","corda","corpo","corte","costa","couve","criar",
"crise","curar","curso","dardo","dados","danca","deixa","dedal","denso","dente",
"digno","dizer","doces","doido","dorso","drama","duelo","durar","ecoar","educa",
"eleva","elite","enfim","entra","envio","errar","esqui","espia","estar",
"estou","etapa","exame","falar","fardo","farol","fatal","fatia","fecho","feliz",
"feroz","festa","fibra","filho","firma","fitar","fluir","fobia","focar","folga",
"fonte","forca","forma","forte","fraco","frase","freio","fugaz","fumar","fundo",
"furor","gabar","gaita","garfo","gasto","gelar","gerar","gesto","girar","globo",
"golpe","gosto","grana","grato","grave","grito","grupo","gueto","guiar","haste",
"honra","hotel","humor","idade","ideia","igual","ileso","impor","imune","indio",
"irado","isolar","janta","jogar","jovem","juizo","justo","lados","lagoa","largo",
"laser","leite","leito","lento","leque","lerdo","lesao","levar","lindo","linha",
"livro","local","louco","lucro","lugar","lutar","luzir","macio","magia","magoa",
"maior","malha","manso","marca","matar","mecha","meigo","melar","menor","menos",
"mesmo","metro","miolo","mirar","misto","moeda","molde","morar","morro","morte",
"motim","motor","mover","mudar","muito","mural","museu","nadar","navio","negar",
"nevar","nivel","noite","norma","norte","nuvem","obter","ocaso","odiar","olhar",
"ombro","ondas","ontem","opcao","ordem","orgao","ousar","outro","pacto","pagar",
"palco","papel","parar","parte","passo","pasta","pedra","pegar","peito","perda",
"perto","pesar","piano","picar","pilha","pingo","pista","placa","plano","poder",
"poema","ponto","porco","porta","posse","praia","prato","prazo","preco","preso",
"prime","primo","prosa","prova","queda","quero","quilo","raiar","raiva","rango",
"rapaz","rasgo","razao","reino","repor","resto","risco","ritmo","rocha","rosto",
"roupa","ruido","saber","sacar","sadio","sagaz","salto","santo","saque","saude",
"seara","secar","sedia","senso","serao","serie","servo","sinal","sobra","sobre",
"solar","sonho","sorte","subir","sujar","surto","tacar","talha","tarde","taxar",
"tecer","tecla","teimo","tempo","tenaz","tendo","tenis","termo","terra","texto",
"tigre","tirar","toque","torre","trago","trama","trapo","trava","treco","treta",
"tribo","troca","trono","turma","uniao","urubu","usado","usual","vagar","valer",
"valor","vapor","vazio","velho","veloz","venda","vento","verbo","verde","verso",
"vetor","vicio","vidro","vigor","vinho","virar","visao","vista","vital","viver",
"volei","volta","votar","zebra"
]
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