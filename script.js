const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const descansoC = document.querySelector('.app__card-button--curto');
const descansoL = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botao = document.querySelectorAll('.app__card-button');
const botaoMusica = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const comecarPausar = document.querySelector('#start-pause span');
const icon = document.querySelector('.app__card-primary-butto-icon')

const playSom = new Audio ('/sons/play.wav');
const acabouSom = new Audio ('/sons/beep.mp3');
const pauseSom = new Audio ('/sons/pause.mp3');
const pauseIcon = '/imagens/pause.png';
const playIcon = '/imagens/play_arrow.png';
const tempo = document.querySelector('#timer')

let temporizador = 1500
let intetvaloId = null

musica.loop = true

botaoMusica.addEventListener('change', function(){
    if (musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    temporizador = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

descansoC.addEventListener('click', () =>{
    temporizador = 300
    alterarContexto('descanso-curto')
    descansoC.classList.add('active')
});

descansoL.addEventListener('click', () =>{
    temporizador = 900
    alterarContexto('descanso-longo')
    descansoL.classList.add('active')
});

function alterarContexto(contexto){
    mostrarTempo()
    botao.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `

        default:
            break;
    }
};

const contagem = () => {
    if(temporizador <= 0 ){
        zerar()
        acabouSom.play()
        return
    }
    temporizador -=1
    mostrarTempo()
};

startPauseBt.addEventListener('click', inicial);

function inicial () {
    if (intetvaloId){
        pauseSom.play()
        zerar()
        
        return
    }
    playSom.play()
    intetvaloId = setInterval(contagem, 1000)
    comecarPausar.textContent = 'Pausar'
    icon.src = pauseIcon
};

function zerar () {
    clearInterval(intetvaloId)
    comecarPausar.textContent = 'Começar'
    icon.src = playIcon

    intetvaloId = null
};

function mostrarTempo (){
    const tempoTimer = new Date(temporizador * 1000)
    const tempoMelhor = tempoTimer.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempo.innerHTML = `${tempoMelhor}`

}
mostrarTempo()