const Task = require('../src/taskmodel');
const assert = require('assert').strict

describe('integration test', function () 
{
    describe('task tests', function() 
    {
        describe('id tests', function() 
        {
            xit('should be able to get the id by status', function () {
                const task1 = new Task({title:'task1', id:'ca55c127-89ff-49b1-a062-5b2e46bb318e', done:true})
                const task2 = new Task({title:'task2', id:'85ec70e0-7184-4e7d-936a-67b16a9836bf', done:false})
                const task3 = new Task({title:'task3', id:'eedb4619-5474-4356-b26d-bb95c11fa85f', done:false})
                const task4 = new Task({title:'task4', id:'875b6011-ec60-4488-9806-d304f66d3e44', done:true})
                const tasks = [task1, task2, task3, task4];
                const ids = tasks.getIdsByStatus(true)
                assert.strictEqual(ids, ['ca55c127-89ff-49b1-a062-5b2e46bb318e', '875b6011-ec60-4488-9806-d304f66d3e44'])
            })
        })
    })
})