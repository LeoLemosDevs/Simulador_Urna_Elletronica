let tela = document.querySelector('.tela');

function clicou(n) {
    console.log("Clicou em " + n);
    tocarSomTecla();
    // A lógica real será implementada depois
}

function branco() {
    console.log("Clicou em BRANCO");
    tocarSomTecla();
}

function corrige() {
    console.log("Clicou em CORRIGE");
    tocarSomTecla();
}

function confirma() {
    console.log("Clicou em CONFIRMA");
    tocarSomFim();
}

// Síntese de áudio simples para emular o som da urna
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tocarSomTecla() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Frequência do beep curto
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function tocarSomFim() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    // Frequência próxima do "pirililili" (apenas um beep longo por enquanto, depois podemos melhorar para a melodia)
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.5);
}
