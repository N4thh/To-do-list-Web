const express = require('express'); 
const router = express.Router(); 
const todoController = require('../controllers/toDocontroller'); 

router.get('/',todoController.getTodos) ; 
router.post('/',todoController.postTodos) ; 
router.put('/:id',todoController.putTodos);
router.delete('/:id',todoController.deleteTodos);


module.exports = router;
