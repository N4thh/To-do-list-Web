let todos = [];
//get
const getTodos = (req,res) => res.json(todos)
//post
const postTodos = (req,res) => {
  const {title} = req.body;
  const newTodo = {id: todos.length + 1, title, completed: false}; 
  todos.push(newTodo);
  res.status(201).json(newTodo);
};
//put
const putTodos = (req,res) => { 
  const { id } = req.params;
const{title, completed} = req.body; 
const todo = todos.find(t => t.id == id); 
if (!todo) return res.status(404).json({message: 'Todo not found'}); 
if(title) todo.title = title; 
if(completed !== undefined) todo.completed = completed; 
res.json(todo); 
};
//delete
const deleteTodos = (req,res) => {
  const {id} = req.params; 
   todos = todos.filter(t => t.id != id); 
  res.status(204).send();
};

module.exports =  {getTodos, postTodos, putTodos, deleteTodos};