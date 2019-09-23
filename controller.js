;(function(){

  function start(){
    //добавляем на страницу div.app c кнопками и инпутом
    document.body.append(view.getRoot()) 

    //каждый раз, когда в model изменяется БД, будет выполняться ф-ция update
    model.dispatch = view.update

    //выводим содержимое БД
    view.update(model.getItems())

    //реагируем на клик по кнопкам
    view.clickHandler = function(elementId, itemId) {

      /* если пришел 'clickByItem', изменяем состояние чекбокса */
      if(elementId === 'clickByItem'){
        model.toggleChecked(itemId)
      }
      /* если нажата кнопка с id='addItem'и поле не пустое, добавляем элемент и очищаем инпут*/
      else if(elementId === 'addItem'){
        const value = view.getValue()

        if(value !== ''){
          model.addItem(value)
          view.setValue('')
        }
      }
      /* если нажата кнопка с id='makeDone', запрашиваем список и меняем статус записи на true, и состояние Checked */
      else if(elementId === 'makeDone'){
        const items = model.getItems()

        for(const item of items){
          if(item.checked){
            model.setDoneStatus(item.id, true)
            model.toggleChecked(item.id)
          }
        }
      }
      /* если нажата кнопка с id='makeNotDone', запрашиваем список и меняем статус записи на false, и состояние Checked */
      else if(elementId === 'makeNotDone'){
        const items = model.getItems()

        for(const item of items){
          if(item.checked){
            model.setDoneStatus(item.id, false)
            model.toggleChecked(item.id)
          }
        }
      }
      /* если нажата кнопка с id='remove', запрашиваем список и удаляем элемент */
      else if(elementId === 'remove'){
        const items = model.getItems()

        for(const item of items){
          if(item.checked){
            model.removeItem(item.id)
          }
        }
      }
    }
  }

  window.controller = {
    start: start
  }
})();