;(function(){
  let items = [
    { id: 1, content: 'купить хлеб', done: true, checked: false },
    { id: 2, content: 'купить молоко', done: false, checked: true }
  ]
  let idCounter = 3
  
  //передать копию данных в др.место
  function getItems(){
    const copyItems = []

    for(const item of items){
      copyItems.push({
        id: item.id,
        content: item.content,
        done: item.done,
        checked: item.checked
      })
    }

    return copyItems
  }
  
  //добавить новый элемент списка
  function addItem (content){
    const item = {
      id: idCounter,
      content: content,
      done: false,
      checked: false
    }
  
    idCounter++
  
    items.push(item)

    model.dispatch(getItems())
  }
  
  //удалить элемент списка
  function removeItem (removedId){
    const newItems = []
  
    for(const item of items){
      if(item.id !== removedId){
        newItems.push(item)
      }
    }
  
    items = newItems

    model.dispatch(getItems())
  }

  //заменяем значение checked на противоположное
  function toggleChecked (itemId){
    for(const item of items){
      if(item.id === itemId){
        item.checked =!item.checked
      }
    }

    model.dispatch(getItems())
  }
  
  //меняем статус элемента
  function setDoneStatus (itemId, status){
    for(const item of items){
      if(item.id === itemId){
        item.done = status
      }
    }

    model.dispatch(getItems())
  }

  //создаем объект в window, чтобы ч/з него обращаться к функциям
  window.model = {
    getItems: getItems,
    addItem: addItem,
    removeItem: removeItem,
    toggleChecked: toggleChecked,
    setDoneStatus: setDoneStatus,
    dispatch: () => {}
  }
})();