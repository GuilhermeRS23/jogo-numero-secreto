// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha número entre 1 e 10.'
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoEmTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); ---Função de Voz
}

function exibirMsgIniciais() {
    exibirTextoEmTela('h1', 'Jogo do número secreto');
    exibirTextoEmTela('p', 'Escolha número entre 1 e 100.');
}
exibirMsgIniciais();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Parabéns! Você descobriu número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoEmTela('h1', 'Acertou!');
        exibirTextoEmTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chuteBotao').setAttribute('disabled', true);

    } else {
        let palavraMaiorMenor = chute > numeroSecreto ? 'menor' : 'maior';
        let mensagemErro = `Número secreto é ${palavraMaiorMenor} que ${chute}.`;
        exibirTextoEmTela('p', mensagemErro);
        tentativas++;
        limparCampo();
    }
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

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMsgIniciais();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chuteBotao').removeAttribute('disabled');
}