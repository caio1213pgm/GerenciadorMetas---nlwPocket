const {select, input} = require('@inquirer/prompts');

let meta01 = {
    objetivo: "Estudar 2 horas por dia",
    status: false,
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
        objetivo: meta,
        status: false
    });
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
                console.log(metas);
                break
            case 3:
                console.log("Marcar metas");
                break;
            case 4: 
                console.log("Remover metas");
                break;
            case 5:
                console.log("Sair");
                return;
        }
    };
};

menu();