//Lógica
// 1. pegar o atributo data
// 2. pego o atributo iremos basicamente enviar ele para o flask e dessa forma vamos criar uma rota atraves da id

// adicionar um evento para cada vez que for clicado obter a id do elemento
function Checkon(params) {
  let checkbox = document.querySelector("#checkID")
  let checked = checkbox.getAttribute("data-task-id")

  console.log(checked)
}


