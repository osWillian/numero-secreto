let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

MensagemInicial();

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function MensagemInicial() {
    exibirTextoNaTela ('h1','Jogo do número secreto');
    exibirTextoNaTela ('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
   } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);        
        exibirTextoNaTela('h1', 'Acertou!'); 
        document.getElementById('reiniciar').removeAttribute('disabled');    
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++
        limparCampo();
    } 
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    MensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}