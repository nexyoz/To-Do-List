document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
});

function addTodo() {
    const input = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const priority = prioritySelect.value;
    const newTodo = input.value.trim();

    if (newTodo) {
        const list = document.getElementById('todo-list');
        const listItem = document.createElement('li');
        listItem.className = priority; // 设置优先级样式
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(newTodo));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.className = 'delete';
        deleteButton.onclick = function() {
            listItem.remove();
            removeTodoFromStorage(newTodo);
        };
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        input.value = '';
        addTodoToStorage(newTodo, priority);
    }
}

function addTodoToStorage(todo, priority) {
    let todos = getTodosFromStorage();
    todos.push({ todo, priority });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromStorage() {
    let todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function loadTodos() {
    const todos = getTodosFromStorage();
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = todo.priority; // 设置优先级样式
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.todo.includes('[完成]');
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(todo.todo.replace('[完成]', '')));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.className = 'delete';
        deleteButton.onclick = function() {
            listItem.remove();
            removeTodoFromStorage(todo.todo);
        };
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
        document.getElementById('todo-list').appendChild(listItem);
    });
}

function removeTodoFromStorage(todo) {
    let todos = getTodosFromStorage();
    todos = todos.filter(t => t.todo !== todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleInstructions() {
    const instructions = document.querySelector('.instructions');
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
    } else {
        instructions.style.display = 'none';
    }
}