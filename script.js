let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
let telaInicial = document.getElementById('tela-inicial');
let telaVotacao = document.getElementById('tela-votacao');

let etapaAtual = 0;
let numeroDigitado = '';
let votoBranco = false;

// Controle de tempo inicial
let tempoContagem = 10;
let contagemEl = document.getElementById('contagem');

function iniciarUrna() {
    let timer = setInterval(() => {
        tempoContagem--;
        if(tempoContagem > 0) {
            contagemEl.innerHTML = `Iniciando em ${tempoContagem}...`;
        } else {
            clearInterval(timer);
            // Efeito Fade Out na tela inicial
            telaInicial.style.opacity = '0';
            setTimeout(() => {
                telaInicial.style.display = 'none';
                telaVotacao.style.display = 'flex';
                // Efeito Fade In na tela de votação
                setTimeout(() => {
                    telaVotacao.style.opacity = '1';
                }, 50);
                comecarEtapa();
            }, 1000); // tempo da transição
        }
    }, 1000);
}

// Inicia o processo quando a página carrega
window.onload = () => {
    telaVotacao.style.opacity = '0'; // Começa invisível para o fade
    iniciarUrna();
};

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numeroDigitado = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numeroDigitado) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        
        let infoHtml = `Nome: <b>${candidato.nome}</b><br/>Partido: <b>${candidato.partido}</b><br/>`;
        if (candidato.vice) {
            infoHtml += `Vice: <b>${candidato.vice}</b>`;
        }
        descricao.innerHTML = infoHtml;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt="Foto Vice" /></div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="imagens/${candidato.fotos[i].url}" alt="Foto Candidato" /></div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    if(tempoContagem > 0) return; // Trava teclado na tela inicial
    tocarSomTecla();
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if(tempoContagem > 0) return; 
    tocarSomTecla();
    if (numeroDigitado === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    } else {
        alert("Para votar em BRANCO, o campo de votação deve estar vazio. Aperte CORRIGE para apagar.");
    }
}

function corrige() {
    if(tempoContagem > 0) return; 
    tocarSomTecla();
    comecarEtapa();
}

function confirma() {
    if(tempoContagem > 0) return; 
    
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...");
    } else if (numeroDigitado.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Confirmando voto no candidato: " + numeroDigitado);
    } else if (numeroDigitado.length === 0) {
        // Regra do voto nulo sem digitar nada
        votoConfirmado = true;
        console.log("Confirmando como NULO (nada digitado)...");
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            audioBeepVoto.play(); // Toca beep_voto.mp3 na confirmação intermediária
            // Efeito Fade entre cargos
            telaVotacao.style.opacity = '0';
            setTimeout(() => {
                comecarEtapa();
                telaVotacao.style.opacity = '1';
            }, 500);
        } else {
            audioBeepFinal.play(); // Toca beep_final.mp3 apenas no final
            document.querySelector('.tela').innerHTML = '<div class="aviso-grande pisca" style="width: 100%; display: flex; justify-content: center; align-items: center; font-size: 70px;">FIM</div>';
        }
    }
}

// Instâncias de Áudio reais
const audioBeepVoto = new Audio('sons/beep_voto.mp3');
const audioBeepFinal = new Audio('sons/beep_final.mp3');

// Contexto de áudio para o som de teclar normal (beep curto)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tocarSomTecla() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Frequência de um beep curto e seco, típico de teclado de urna
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

/* Funções de Tela Cheia (Fullscreen API) */
let elem = document.documentElement;
let btnFullscreen = document.getElementById('btn-fullscreen');
let btnExitFullscreen = document.getElementById('btn-exit-fullscreen');

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    btnFullscreen.style.display = 'none';
    btnExitFullscreen.style.display = 'block';
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    btnFullscreen.style.display = 'block';
    btnExitFullscreen.style.display = 'none';
}

// Escuta mudanças no modo de tela cheia caso o usuário saia pelo 'Esc'
document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreenElement) {
        btnFullscreen.style.display = 'block';
        btnExitFullscreen.style.display = 'none';
    }
});
