const menu = () =>{
    
    while(true){
        console.log(`1 - Criar metas; 2 - Listar metas; 3 - Marcar metas; 4 - Remover metas; 5 - Sair`)
        let opcao = 5;
        switch(opcao){
            case 1: 
                console.log("Criar metas");
                break;
            case 2: 
                console.log("Listas metas");
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