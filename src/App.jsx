import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
function App() {
  const [todos, setTodos] = useState([{
    id: 1,
    text: 'Estudar React',
    category: 'Faculdade',
    completed: false,
  },
  {
    id: 2,
    text: 'Estudar Node',
    category: 'Faculdade',
    completed: false,
  },
  {
    id: 3,
    text: 'Fazer exercícios',
    category: 'Pessoal',
    completed: false,
  },
  {
    id: 4,
    text: 'Concluir projeto',
    category: 'Trabalho',
    completed: false,
  },
]);

const addTodo = (text, category) => {
  const newTodo = [...todos, {
    id: Math.random() * 1000,
    text,
    category,
    completed: false,
  }];
  setTodos(newTodo);
};

const removeTodo = (id) => {
  const newTodo = todos.filter((todo) => todo.id !== id);
  setTodos(newTodo);
};

const completeTodo = (id) => {
  const newTodo = todos.map((todo) => {
    if(todo.id === id) todo.completed = !todo.completed;
    return todo;
  });
  setTodos(newTodo);
}
  return <div className="app">
    <h1>Lista de Tarefas</h1>
    <div className="todo-list">
      {todos.map((todo)=>(
        <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
      ))}
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>
}

export default App
