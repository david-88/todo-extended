//editTask

//moveTask (inside a taskList and to another taskList)

const tasksViewFactory = function (htmlElement, addButton, inputField) {
    let newTaskText = null;
    let onClickAddTask = null;
    let onClickDeleteTask = null;
    function initialize() {
        this.addButton.addEventListener('click', this.onClickAddTask);
    };
    function setNewTaskText () {
        this.newTaskText = this.inputField.value;
    }
    function renderExistingTasks(viewModel) {
        this.inputField.value = '';
        this.htmlElement.innerHTML = '';
        viewModel.forEach(renderOneTask, this);
    };
    function renderOneTask(taskObject) {
        const taskID = taskObject.id;
        const p = document.createElement('p');
        const deleteButton = document.createElement('button')

        deleteButton.innerHTML = 'del';
        deleteButton.dataset.taskid = taskID;
        deleteButton.addEventListener('click', this.onClickDeleteTask);

        p.innerHTML = taskObject.text;
        p.appendChild(deleteButton);

        this.htmlElement.appendChild(p);
    };
    return {
        htmlElement, addButton, inputField, newTaskText, onClickAddTask, onClickDeleteTask,
        initialize, renderExistingTasks, setNewTaskText
    }
}

export {tasksViewFactory}

//Old initial constructor Code rewritten above into Factory function
/*const TasksView = function (htmlElement, addButton, inputField) {
    this.htmlElement = htmlElement;
    this.addButton = addButton;
    this.inputField = inputField;
    this.newTaskText = null;
    this.onClickAddTask = null;
}
TasksView.prototype.initialize = function () {
    this.addButton.addEventListener('click', this.onClickAddTask);
};
TasksView.prototype.renderExistingTasks = function (viewModel) {
    this.htmlElement.innerHTML = '';
    viewModel.forEach(this.renderOneTask.bind(this));
}
TasksView.prototype.renderNewTask = function () {
    this.newTaskText = this.inputField.value;
    this.inputField.value = '';
    this.renderOneTask(this.newTaskText);
}
TasksView.prototype.renderOneTask = function (task) {
    const p = document.createElement("p");  
    p.innerHTML = task;
    this.htmlElement.appendChild(p);
}*/