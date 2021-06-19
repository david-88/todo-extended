// Code specifically for tasks
const tasksControllerFactory = function () {
  return {}
}

// Code specifically for lists
const listsControllerFactory = function () {
  return {}
}

// Controller-Mixin to create items for tasks, lists, undertasks
const itemsCreationController = function (itemsView, itemsModel, fbRef) {
  function onClickAddItem () {
    itemsView.setNewItemText()
    itemsModel.addItem(itemsView.newItemText)
    // itemsView.renderExistingItems(itemsModel.data)
  }
  function onClickDeleteItem (event) {
    const itemToDeleteID = event.target.dataset.itemid
    itemsModel.deleteItem(itemToDeleteID)
    itemsView.renderExistingItems(itemsModel.data)
  }
  function initialize () {
    itemsView.onClickAddItem = onClickAddItem
    itemsView.onClickDeleteItem = onClickDeleteItem
    itemsModel.initialize(fbRef)
    itemsView.initialize()
    createDbOnChangeListener()
  }

  function createDbOnChangeListener () {
    fbRef.on('value', (dBData) => {
      const dbDataArray = itemsModel.formatDbData(dBData)
      itemsView.renderExistingItems(dbDataArray)
    })
  }
  return { initialize }
}

export {
  itemsCreationController,
  // itemValidationController,
  listsControllerFactory,
  tasksControllerFactory
}
