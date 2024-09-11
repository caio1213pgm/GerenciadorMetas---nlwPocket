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
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!");
        return;
    }

    metas.forEach((m) => {
        m.checked = false;
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })
        meta.checked = true;
    })

    console.log("Metas concluídas");
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
                    name: "Marcar metas",
                    value: 3
                },
                {
                    name: "Remover metas",
                    value: 4
                },
                {
                    name: "Sair",
                    value: 5
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
                console.log("Marcar metas");
                break;
            case 4: 
                console.log("Remover metas");
                break;
            case 5:
                console.log("Até breve");
                return;
        }
    };
};

menu();