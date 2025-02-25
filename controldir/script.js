
const tbody = document.getElementById("tbody")
const diretorio = document.getElementById("diretorio")
const btn = document.getElementById("btn")
async function listarDiretorios(dir) {
    try{
        const result = await cockpit.spawn(["ls", "-l", `${dir}`])
        const linhas = result.split("\n")

        
        const diretorios = linhas
        .filter(linha => linha.trim() !== "" && !linha.startsWith("total"))
        .map(linha => {
            // Usando regex para capturar as informações da linha
            const regex = /^([drwx-]+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(\d+)\s+(\w+\s+\d+\s+\d+\:\d+)\s+(.+)$/;
            const match = linha.match(regex);

            if (match) {
                return {
                    permissao: match[1],
                    links: match[2],
                    usuario: match[3],
                    grupo: match[4],
                    tamanho: match[5],
                    data: match[6],
                    nome: match[7]
                };
            }
        }).filter(Boolean); // Remove valores nulos ou indefinidos

        let id = 1
        diretorios.forEach((item) => {
        

            tbody.innerHTML += `
                <tr>
                    <td>${item.permissao}</td>
               
                    <td>${item.links}</td>
             
                    <td>${item.usuario}</td>
             
                    <td>${item.grupo}</td>
              
                    <td>${item.tamanho}</td>
              
                    <td>${item.data}</td>
                    <td>${item.nome}</td>
                    <td>${id++}</td>
                </tr>
            `
        })


    // Exibir os diretórios na página (opcional)
    }catch(error)
    {
        console.log(error)
        return 0
    }
}




addEventListener("DOMContentLoaded", () => {
    listarDiretorios("/")
})

btn.addEventListener("click", () => {
    const dir = diretorio.value
    listarDiretorios(dir)
})
cockpit.transport.wait(function() { })
