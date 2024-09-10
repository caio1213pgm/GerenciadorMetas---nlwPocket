console.log("Olá, mundo!");


let meta = {
    objetivo: "Estudar e praticar 2 horas por dia", // atributos do objeto ou propriedades
    estado: false, //atributos do objeto ou propriedades
    apresentarMeta: () => { //metódo do objeto, função/ação que ele realiza 
        console.log(`Objetivo a ser realizado: ${meta.objetivo}. Meta concluida? ${meta.estado}`);
    },
}
console.log(meta.isChecked());