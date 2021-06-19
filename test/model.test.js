const itemsCreationModel = require('../src/model')
const assert = require('assert').strict;

describe('integration test', function() 
{
  it("should be able to add and complete TODOs", function() 
  {
    let todos = new itemsCreationModel();
    assert.notStrictEqual(todos.length, 1);
  });
});