const addTodoButton = document.getElementById('add-todo');

/**
 * function getTodos()
 * Returns a list of todos from localStorage
 */
function getTodos() {
  // Get todos from localStorage
  const todos = JSON.parse(localStorage.getItem('todos'));

  // Validate that there are todos
  if (todos && Array.isArray(todos) && todos.length >= 1) {
    return todos;
  }
  return [];
}

/**
 * function setTodo()
 * @param {Object<{ id: String, name: String }>} todo Todo we want to save
 * Returns nothing
 */
function setTodo(todo) {
  // Get todos from localStorage
  const todos = getTodos();

  // Add the new todo to todos
  todos.push(todo);

  // Set the new todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  updateTodoList();
}

/**
 * function setTodos(todos)
 * @param {Array<Object<{ id: String, name: String }>>} todos
 */
function setTodos(todos) {
  // Set the new todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  updateTodoList();
}

/**
 * function handleAdd()
 * Adds a todo
 */
function handleAdd() {
  const todoInput = document.getElementById('todo-name');
  const todoName = todoInput.value;
  if (isValidateTodoName(todoName)) {
    const todo = {
      name: todoName,
      id: uuidv4(),
    };
    setTodo(todo);
    todoInput.value = '';
  }
}

/**
 * function handleDelete(id)
 * @param {String} id The id of the todo
 */
function handleDelete(id) {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  setTodos(todos);
}

/**
 * function isValidateTodoName(name)
 * @param {String} name The name of the todo
 * Returns true or false if the todo name is valid
 */
function isValidateTodoName(name) {
  const nameWithoutSpaces = name.trim();
  if (name.length >= 1 && nameWithoutSpaces.length >= 1) {
    return name;
  }
  return false;
}

/**
 * function updateTodoList()
 * Gets the todos from localStorage and then sets it to the UI
 */
function updateTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.textContent = '';

  const todos = getTodos();
  if (todos.length === 0) {
    const noTodos = document.createTextNode('No todos');
    todoList.append(noTodos);
    return null;
  }
  todos.forEach((todo) => {
    const todoElement = createTodo(todo.name, todo.id);
    todoList.append(todoElement);
  });
}

/**
 * function createTodo(name, id);
 * @param {String} name The name of the todo
 * @param {String} id The id of the todo
 * Returns list items for the todo
 */
function createTodo(name, id) {
  const listItem = document.createElement('li');
  listItem.classList.add('mdc-list-item', 'between');

  const itemRipple = document.createElement('span');
  itemRipple.classList.add('mdc-list-item__ripple');

  const itemText = document.createElement('span');
  itemText.classList.add('mdc-list-item__text');
  itemText.textContent = name;

  const itemIcon = document.createElement('span');
  itemIcon.classList.add('material-icons', 'mdc-fab__icon');
  itemIcon.textContent = 'delete';

  itemIcon.onclick = () => handleDelete(id);

  listItem.append(itemRipple, itemText, itemIcon);

  return listItem;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

updateTodoList();

addTodoButton.addEventListener('click', handleAdd);
