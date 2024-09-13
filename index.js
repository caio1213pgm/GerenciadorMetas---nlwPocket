const {select, input, checkbox} = require('@inquirer/prompts');

let meta01 = {
    value: "Estudar 2 horas por dia",
    checked: false,
}

let metas = [
    meta01,
]

const cadastrarMeta = async() => {
    const meta = await input({message: "Digite uma meta"});

    if(meta.length == 0){
        console.log("A meta não pode ser vazia. Tente novamente!");
        return cadastrarMeta();
    }
    metas.push({
        value: meta,
        checked: false
    });
}

const listarMetas = async () =>{
    const respostas = await checkbox({
        message: "Espaço para marcar ou desmarcar e Enter para finalizar",
        choices: [...metas],
        instructions: false
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if(respostas.length == 0 || metas.length == 0){
        console.log("Nenhuma meta selecionada!");
        return;
    };

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })
        meta.checked = true;
    });

    console.log("Metas concluídas");
}

const  metasRealizadas = async () =>{
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if(realizadas.length == 0){
        console.log("Nenhuma meta realizada!");
        return;
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {

    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    })

    if(abertas.length == 0){
        console.log("Não existem metas abertas!");
        return;
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const removerMetas = async () =>{

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false };
    })

    const paraDeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    });

    if(paraDeletar.length == 0){
        console.log("Nenhum item a ser deletado");
        return;
    }
    
    paraDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        })
    })

    console.log("Metas deletas!");
}

const menu = async() =>{
    
    while(true){
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
                console.log("Meta adicionada com sucesso!");
                break;

            case 2: 
                console.log("Visualizando metas:");
                await listarMetas();
                break;

            case 3:
                console.log("Visualizando metas realizadas");
                await metasRealizadas();
                break;

            case 4:
                console.log("Visualizando metas abertas");
                await metasAbertas();
                break;
            case 5: 
                console.log("Deletar metas: ");
                await removerMetas();
                break;
            case 6:
                console.log("Até breve");
                return;
        }
    };
};

menu();