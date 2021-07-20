const Item = require('../src/itemmodel')
const assert = require('assert').strict

describe('integration test', function () {

  describe('item tests', function() {

    describe('title tests', function () {
      xit('should be able to get the title', function () {
        const item = new Item('myItem')
        const title = item.getTitle()
        assert.strictEqual(title, 'myItem')
      })
  
      xit('should be able to change the title', function () {
        const item = new Item('myItem')
        item.setTitle('myChangedItem')
        const title = item.getTitle()
        assert.strictEqual(title, 'myChangedItem')
      })
  
      xit('should throw error if more than 255 title chars', function () {
        const createError = () => {
          const item = new Item('More then 255 a\'s: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        }
        assert.throws(createError, new Error('too many characters'))
      })
  
      xit('should throw error if no title chars', function () {
        const createError = () => {
          const item = new Item('')
        }
        assert.throws(createError, new Error('no characters'))
      })
    })
  
    describe('id tests', function() {
      xit('should be able to get the id', function () {
        const item = new Item('myNewItem')
        const id = item.getId()
        assert.match(id,/-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz/)
      })
  
      xit('should be able to get the id by title/keyword', function () {
        // Get id which was generated by id generator
        const item = new Item({title:'myNewItem', id: '53dc76dd-aef8-447e-b465-7db479991e3e'})
        const id = item.getIdByString('myNewItem')
        assert.strictEqual(id, '53dc76dd-aef8-447e-b465-7db479991e3e')
      })
  
      xit('should throw error if not a valid id', function() {
  
      })
    })
  
    xit('should be able to get the order', function () {
      // Get order which was assigned automically at creation
    })
  })
})
