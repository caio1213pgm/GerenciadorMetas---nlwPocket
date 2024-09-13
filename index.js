const {select, input, checkbox} = require('@inquirer/prompts');
const fs = require('fs').promises;

let mensagem = "Bem vindo";

let meta01 = {
    value: "Estudar 2 horas por dia",
    checked: false,
}

let metas = [
    meta01,
]

const carregarMetas = async () => {

    try{
        const dados = await fs.readFile("metas.json", "utf-8");
        metas = JSON.parse(dados);
    }
    catch(erro){
        metas = [];
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async() => {
    const meta = await input({message: "Digite uma meta"});

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia. Tente novamente!";
        return;
    }
    metas.push({
        value: meta,
        checked: false
    });

    mensagem = "Meta cadastrada com sucesso";
}

const listarMetas = async () =>{

    if(metas.length == 0){
        mensagem = "Não existem metas. Crie uma meta!";
        return;
    }

    mensagem = "Visualizando metas";
    
    const respostas = await checkbox({
        message: "Espaço para marcar ou desmarcar e Enter para finalizar",
        choices: [...metas],
        instructions: false
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!";
        return;
    };

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })
        meta.checked = true;
    });

    mensagem = "Metas concluídas";
}

const  metasRealizadas = async () =>{

    if(metas.length == 0){
        mensagem = "Não existem metas. Crie uma meta!";
        return
    }

    mensagem = "Visualizando metas realizadas";
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if(realizadas.length == 0){
        mensagem = "Nenhuma meta realizada!";
        return;
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas. Crie uma meta!";
        return
    }

    mensagem = "Visualizando metas abertas";
    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas!";
        return;
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const removerMetas = async () =>{

    if(metas.length == 0){
        mensagem = "Não existem metas. Crie uma meta!";
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false };
    })

    const paraDeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    });

    if(paraDeletar.length == 0){
        mensagem = "Nenhum item a ser deletado"
        return;
    }
    
    paraDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        })
    })

    mensagem = "Metas deletadas!"
}

const mensagens = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const menu = async() =>{
    await carregarMetas();

    while(true){
        mensagens();
        await salvarMetas();
        const opcao = await select({
            message: "Menu: ",
            choices: [
                {
                    name: "Cadastrar meta",
                    value:1
                },
                {
                    name: "Listar  metas",
                    value: 2
                },
                {
                    name: "Metas realizadas",
                    value: 3
                },
                {
                    name:"Metas abertas",
                    value: 4
                },
                {
                    name:"Remover metas",
                    value: 5
                },
                {
                    name: "Sair",
                    value: 6
                }
            ]
        });

        switch(opcao){
            case 1: 
                await cadastrarMeta();
                break;
            case 2: 
                await listarMetas();
                break;

            case 3:
                await metasRealizadas();
                break;
            case 4:
                await metasAbertas();
                break;
            case 5: 
                await removerMetas();
                break;
            case 6:
                console.log("Até breve!");
                return;
        }
    };
};

menu();