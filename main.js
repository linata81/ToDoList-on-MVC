//ToDo-list alone file

let items = [
  { id: 1, content: 'купить хлеб', done: true, checked: false },
  { id: 2, content: 'купить молоко', done: false, checked: true }
]

update() //чтобы сразу отобразить в коде данные из массива items

//по клику, создаем новый объект для массива, добавляем его в конец массива, вызываем update и очищаем поле input
document.querySelector('#addItem').addEventListener('click', function(event){
  const enterElement = document.querySelector('#enter')
  const item = {
    content: enterElement.value,
    done: false,
    checked: false
  }

  items.push(item)
  update()
  enterElement.value = ''
})

//обработчики кнопок
document.querySelector('#makeDone').addEventListener('click', function(event) {
  for(const item of items) {
    if(item.checked){
      item.done = true
      item.checked = false
    }
  }
  update()
})
document.querySelector('#makeNotDone').addEventListener('click', function(event) {
  for(const item of items) {
    if(item.checked){
      item.done = false
      item.checked = false
    }
  }
  update()
})
document.querySelector('#remove').addEventListener('click', function(event) {
  const newItems = []
  for(const item of items){
    if(!item.checked){
      newItems.push(item)
    }
  }
  items = newItems
  update()
})

//создаем виртуальный ul, очищаем ToDo-лист, добавляем ul в DOM
function update(){
  const todoListElement = document.querySelector('#todoList')
  const ulElement = createTodoList(items)
  todoListElement.textContent = ''
  todoListElement.append(ulElement)
}

//создаем виртуальный ul
function createTodoList(items){
  const ulElement = document.createElement('ul')

  for(const item of items){
    const liElement = document.createElement('li')
    const inputElement = document.createElement('input')

    inputElement.setAttribute('type','checkbox')

    if(item.done){
      liElement.classList.add('done')
    }

    if(item.checked){
      inputElement.setAttribute('checked','') //'' заменяют true
    }

    liElement.append(inputElement)
    liElement.append(' ' + item.content)

    ulElement.append(liElement)

    //по клику изменяем состояние чекбокса
    inputElement.addEventListener('click', function(event){
      event.preventDefault()
      item.checked = !item.checked
      update()
    })
  }

  return ulElement
}