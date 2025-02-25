var nome_pasta = document.getElementById("input")
const btn = document.getElementById("enviar")
const message = document.getElementById("message")
const caminho = "/home/ramajo/Desktop/"
function criar_diretorio() {
    const novo_diretorio = caminho+nome_pasta.value

    try{
        cockpit.spawn(["mkdir", novo_diretorio ])
        .then(()=>{
            alert("Pasta criada com sucesso")
            message.innerText = "Deu certo"
        })
        .catch(err=>{
            alert(err)
            console.log("Erro ao criar pasta")
        })
    } catch(error) {
        console.log(error)
        message.innerText = error
    }
    
}

btn.addEventListener("click", () => {
    criar_diretorio()
})

cockpit.transport.wait(function() { });

// 
