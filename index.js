const menu = () =>{
    
    while(true){
        console.log(`1 - Criar metas 2 - Listar metas`)
        let opcao = 1;
        switch(opcao){
            case 1: 
                console.log("Criar metas");
            break;
            case 2: 
                console.log("Listas metas");
            break
            case 3:
                console.log("Sair");
                return;
        }
    };
};

menu();