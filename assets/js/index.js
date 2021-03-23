const form = document.querySelector("#form");
const selecaoFilmes = form.querySelector("#filmes");
const selecaoHorarios = form.querySelector("#horarios");
const selecaoQtdInteira = form.querySelector("#quantidade-ingresso-inteira");
const selecaoQtdMeia = form.querySelector("#quantidade-ingresso-meia");
const selecaoAssentos = document.getElementsByName('assentos');
const resultado = document.querySelector("#resultado");
let contadorIngressos = 0;
let assentosEscolhidos = [];
let filmeEscolhido;
let horarioEscolhido;

const filme = {
    nome: ['Avengers', 'Transformers', 'Justice League', 'John Wick', 'Titanic'],
    horarios: ['9:00', '12:00', '15:00','18:00', '21:00'],
    valorInteira: 10,
    valorMeia: 5
}

function exibeFilme(escolhaFilme){
    return filme.nome[escolhaFilme - 1];
}

function escolheHorario(horarioEscolhido){
    return filme.horarios[horarioEscolhido - 1];
}

function qtdIngressoMeia(){
    const qtdMeia = (Number(selecaoQtdMeia.value));
    return contadorIngressos += qtdMeia;
}

function qtdIngressoInteira(){
    const qtdInteira = (Number(selecaoQtdInteira.value));
    return contadorIngressos += qtdInteira;
}

function contaCheckbox(){
    let contadorCheckbox = 1;
    let excedeu = false;
    
    for (let i = 0;  i < selecaoAssentos.length; i++) {
        if(selecaoAssentos[i].checked){
            if(contadorCheckbox > contadorIngressos) excedeu = true;
            contadorCheckbox++
            assentosEscolhidos.push(selecaoAssentos[i].value);
        }
    }
    return excedeu;
}

selecaoFilmes.addEventListener('change', function(){
    const escolha = Number(selecaoFilmes.value);
    filmeEscolhido = exibeFilme(escolha);
});

selecaoHorarios.addEventListener('change', function(){
    const horario = Number(selecaoHorarios.value);
    horarioEscolhido = escolheHorario(horario);
});

form.addEventListener('submit', function(event){
    event.preventDefault();
    contadorIngressos = 0;
    qtdIngressoInteira();
    qtdIngressoMeia();
    if(contaCheckbox()){
        
        assentosEscolhidos = [];
        return alert('A quantidade de assentos excede a de ingressos. Desmarque os assentos excessivos e tente novamente');
    }

    resultado.classList.remove("resultado-vazio");
    resultado.classList.add("resultado-impresso");
    resultado.innerHTML = `Aguarde impressão...`
    setTimeout(() => {
        resultado.classList.remove("resultado-vazio");
        resultado.classList.add("resultado-impresso");
        resultado.innerHTML = `Ingresso<br>Filme: ${filmeEscolhido}<br>Horario: ${horarioEscolhido}<br>Assentos: ${assentosEscolhidos}`;
        setTimeout(() => {
            const confirma = confirm("Deseja comprar novos ingressos?");
            if(confirma) window.location.reload();
        }, 1000);
    }, 1500);    
})

