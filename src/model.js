// Code specifically for tasks
const tasksModelFactory = function () {
  return {}
}

// Code specifically for lists
const listsModelFactory = function () {
  return {}
}

// Model-Mixin to create items for tasks, lists, undertasks
const itemsCreationModel = function (data) {
  const creationCounter = 0
  let dbRef = ''

  const initialize = function (databaseRef) {
    dbRef = databaseRef
  }

  const addItem = function (itemText) {
    const newItemObject = {
      id: this.creationCounter,
      text: itemText,
    }
    // data.push(newItemObject)

    dbRef.push(newItemObject)
    this.creationCounter++
  }

  const formatDbData = function (snap) {
    const dbDataArray = []
    snap.forEach((task) => {
      dbDataArray.push(task.val())
    })
    return dbDataArray
  }

  const deleteItem = function (itemObjectID) {
    itemObjectID = parseInt(itemObjectID)
    // eslint-disable-next-line array-callback-return
    const indexItemToDelete = data.findIndex(function (currentItem) {
      if (currentItem.id === itemObjectID) {
        return true
      }
    })
    data.splice(indexItemToDelete, 1)
  }
  return {
    initialize,
    data,
    addItem,
    formatDbData,
    deleteItem,
    creationCounter,
  }
}

// Model-Mixin to validate user input for tasks, lists, undertasks
const itemValidationModel = function () {
  return {}
}

export {
  itemsCreationModel,
  itemValidationModel,
  tasksModelFactory,
  listsModelFactory,
}
