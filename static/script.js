//Lógica
// 1. pegar o atributo data
// 2. pego o atributo iremos basicamente enviar ele para o flask e dessa forma vamos criar uma rota atraves da id

// adicionar um evento para cada vez que for clicado obter a id do elemento
let checkboxes = document.querySelectorAll(".check")


// function checkedId(){
//   console.log(checked)

// }

// checkbox.addEventListener('click', () => {
//   console.log(checked.dataset.checkId)

// }) NAO DA CERTO PORQUE CHECKBOX É UMA LISTA NODE, NAO TEM COMO ADICIONAR ADD PARA UMA LISTA

//PARA ISSO USAMOS O FOREACH

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', function () { //entender a diferença com ou sem a =>
    let Idchecked = checkbox.getAttribute("data-task-id") //sucessooo
    const checkStatus = this.checked
    console.log(checkStatus)
    // eu preciso enviar um atributo para o flask T-T, o atributo checkbox para saber o visual, como acessar um atributo html e altera-lo
    fetch(`/up/${Idchecked}`, {
      method:'POST',
    
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        checkedIn: checkStatus
      })
    
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  })
   
});
