;(function(){

  const template = `
  <div class="app">
    <input type="text" name="" id="enter">
    <button id="addItem">Добавить</button>
    <div id="todoList"></div>
    <button id="makeDone">Выполнить</button>
    <button id="makeNotDone">Востановить</button>
    <button id="remove">Удалить</button>
  </div>`

  let rootElement = null

  //возвращает виртуальный div.app со всеми тегами внутри из константы "template"
  function getRoot(){
    const divElement = document.createElement('div')
    divElement.innerHTML = template

    rootElement = divElement.firstElementChild

    const buttonElements = rootElement.querySelectorAll('button')
    for(let i = 0; i < buttonElements.length; i++){
      const buttonElement = buttonElements[i]

      buttonElement.addEventListener('click', function(event){
        view.clickHandler(buttonElement.getAttribute('id'))
      })
    }

    return rootElement
  }

  //получаем содержимое инпута
  function getValue(){
    return rootElement.querySelector('#enter').value
  }

  //устанавливаем значение инпута
  function setValue(value){
    return rootElement.querySelector('#enter').value = value
  }

  //запускаем создание виртуального ul, очищаем ToDo-лист, добавляем ul в DOM
  function update(items){
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

      inputElement.addEventListener('click', function(event){
        event.preventDefault()
        view.clickHandler('clickByItem', item.id)
      })
    }

    return ulElement
  }

  window.view = {
    getRoot: getRoot,
    update: update,
    getValue: getValue,
    setValue: setValue,
    clickHandler: () => {}
  }
})();