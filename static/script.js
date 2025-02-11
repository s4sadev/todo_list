
let checkboxes = document.querySelectorAll(".check")
let buttonsDel = document.querySelectorAll(".task_del")
let InputN = document.getElementById('name_task')
let BtnAdd = document.getElementById('btn_add')

// function checkedId(){
//   console.log(checked)

// }

// checkbox.addEventListener('click', () => {
//   console.log(checked.dataset.checkId)

// }) NAO DA CERTO PORQUE CHECKBOX É UMA LISTA NODE, NAO TEM COMO ADICIONAR ADD PARA UMA LISTA

//PARA ISSO USAMOS O FOREACH

// criar
BtnAdd.addEventListener('click', function(){
  const nameIn = InputN.value
  fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name: nameIn
    })
  })
  .then(response => response.json())
  .then(data => {
    const id = data.id_new
    const name = data.name_new
    const status = data.status_new
    //criar eleemmttt

    // 1x input, 2x p, 2x button
    // 2x button -> 2x img

    //puxar o elemento principalll
    const Tasks = document.getElementById('tarefas')


    // criar o elemento divonico
    const Task = document.createElement('div')
    Tasks.appendChild(Task)
    Task.id = `tarefa-${id}`
    
    //adicionar o elementos filhos

      // input - check
    const CheckInp = document.createElement('input')
    Task.appendChild(CheckInp)
    
    CheckInp.hasAttribute('type') // type
    CheckInp.setAttribute('type', "checkbox")
    
    CheckInp.classList.add('check') // class

    CheckInp.hasAttribute('data-task-id') //data
    CheckInp.setAttribute('data-task-id', `${id}`) //data

    CheckInp.hasAttribute('name')
    CheckInp.setAttribute('name', 'box')

    //img dentro do button
    imgEdit = document.createElement('img')
    CheckInp.appendChild(imgEdit)

    imgEdit.hasAttribute('src')
    imgEdit.setAttribute('src', )

    
    // p - name_task
    const ParagName = document.createElement('p')
    Task.appendChild(ParagName)
    ParagName.textContent = `${name}`
    ParagName.classList.add('name_task') //class

    // p - name_status
    const ParagStatus = document.createElement('p')
    Task.appendChild(ParagStatus)
    ParagStatus.textContent = `${status}`
    ParagStatus.classList.add('name_status')// class
    
    // input - remove
    const ButtDel = document.createElement('button')
    Task.appendChild(ButtDel)
    ButtDel.textContent = 'x'
    ButtDel.classList.add('task_del') //class
    
    ButtDel.hasAttribute('type')
    ButtDel.setAttribute('type', 'submit')

    ButtDel.hasAttribute('data-task-id')
    ButtDel.setAttribute('data-task-id',`${id}`)

  })
  .catch(error => console.log(error))
  


})

//atualizar antigo
// checkboxes.forEach(checkbox => {
//   checkbox.addEventListener('click', function () { //entender a diferença com ou sem a =>

// });


// remove
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


//atalizar neww
  document.getElementById('tarefas').addEventListener('click', (event) => {
    if (event.target.classList.contains('check')) {
      let checkbox = event.target
      console.log(checkbox)

      let Idchecked = checkbox.getAttribute("data-task-id") //sucessooo
      const checkStatus = checkbox.checked //true or false
      
        // eu preciso enviar um atributo para o flask T-T, o atributo checkbox para saber o visual, como acessar um atributo html e altera-lo
      fetch(`/up/${Idchecked}`, {
        method: 'PATCH',

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
    
    }
  })