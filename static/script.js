
let checkboxes = document.querySelectorAll(".check")
let buttonsDel = document.querySelectorAll(".task_del")

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
    const checkStatus = this.checked //true or false
    // eu preciso enviar um atributo para o flask T-T, o atributo checkbox para saber o visual, como acessar um atributo html e altera-lo
    fetch(`/up/${Idchecked}`, {
      method:'PATCH',
    
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        checkedIn: checkStatus
      })
    
    })
    .then(response => response.json())
    .then(data => {
      checkbox.checked = data.result //recebe true ou false e altera a parte visual! / tem que pegar o elemento
      //atualizar o status automaticamente
      
      statusTask = document.querySelector(`#tarefa-${Idchecked} .name_status`) //pegar o elemento p
      if (checkbox.checked == true) {
        statusTask.innerHTML = 'concluido'
      }
      else{
        statusTask.innerHTML = 'pendente'
      }

    })
    .catch(error => console.log(error))
  })
   
});

buttonsDel.forEach(btnDel => {
  btnDel.addEventListener('click', function () {
    let Idchecked = btnDel.getAttribute("data-task-id")  //pegando a task
    
    fetch(`del/${Idchecked}`, {
      method:'DELETE'
    })

    .then(response => response.JSON)
    .then(data => {
      // pegar o nosso elemento
      task = document.getElementById(`tarefa-${Idchecked}`)
      task.remove()
      console.log(task)
    })
    .catch(error => console.log(error))




  })


})
