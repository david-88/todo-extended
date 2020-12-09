const tasksControllerFactory = function (tasksView, tasksModel) {

    function onClickAddTask() {
        tasksView.setNewTaskText();
        tasksModel.addTask(tasksView.newTaskText);
        tasksView.renderExistingTasks(tasksModel.data);       
    }
    function onClickDeleteTask(event) {
        const taskToDeleteID = event.target.dataset.taskid;
        //Delete Task from Model
        tasksModel.deleteTask(taskToDeleteID);
        tasksView.renderExistingTasks(tasksModel.data);
        
    }
    function initialize() {
        tasksView.onClickAddTask = onClickAddTask;
        tasksView.onClickDeleteTask = onClickDeleteTask;
        tasksView.initialize();
    }
    return { initialize }
}

export {tasksControllerFactory}

//Old initial constructor code rewritten above into factory function
/*const TasksController = function (tasksView, tasksModel) {
    this.tasksView = tasksView;
    this.tasksModel = tasksModel;
}

TasksController.prototype.onClickAddTask = function () {
    console.log('in onClickAddTask');
    this.tasksView.renderExistingTasks(this.tasksModel.data);
    this.tasksView.renderNewTask();
    this.tasksModel.addTask(this.tasksView.newTaskText);
}

TasksController.prototype.initialize = function () {
    this.tasksView.onClickAddTask = this.onClickAddTask.bind(this);
    this.tasksView.initialize();
};*/