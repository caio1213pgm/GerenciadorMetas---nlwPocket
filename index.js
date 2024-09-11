const {select} = require('@inquirer/prompts');

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
                console.log("Criar metas");
                break;
            case 2: 
                console.log("Listar metas");
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