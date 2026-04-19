// Data do aniversário: 26 de Abril de 2026 às 00:00:00
const dataAlvo = new Date("April 26, 2026 00:00:00").getTime();

let animacaoAtiva = false;

const atualizador = setInterval(function() {
    // Pega a data e hora atual
    const agora = new Date().getTime();

    // Encontra a distância entre agora e a data do evento
    const distancia = dataAlvo - agora;

    // Cálculos de tempo para dias, horas, minutos e segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Formata com zero à esquerda se for menor que 10
    document.getElementById("days").innerHTML = dias < 10 ? "0" + dias : dias;
    document.getElementById("hours").innerHTML = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutes").innerHTML = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("seconds").innerHTML = segundos < 10 ? "0" + segundos : segundos;

    // Se a contagem regressiva acabar, mostra a mensagem e solta os confetes
    if (distancia < 0) {
        clearInterval(atualizador);
        
        // Esconde a contagem e mostra o texto
        document.getElementById("countdown").classList.add("hidden");
        document.getElementById("today-message").classList.remove("hidden");

        // Dispara os confetes
        if (!animacaoAtiva) {
            animacaoAtiva = true;
            lancarConfetes();
        }
    }
}, 1000);

// Função para gerar muita animação de confetes continuamente
function lancarConfetes() {
    var duration = 15 * 1000; // 15 segundos de explosão contínua
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // Confetes saindo de dois lados da tela
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
// Controle de Música (Novo Player)
const musicToggleBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const trackStatus = document.getElementById('track-status');
let isPlaying = false;

musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggleBtn.innerHTML = '▶️';
        trackStatus.innerHTML = 'Pausado';
    } else {
        bgMusic.play();
        musicToggleBtn.innerHTML = '⏸️';
        trackStatus.innerHTML = 'Tocando...';
    }
    isPlaying = !isPlaying;
});