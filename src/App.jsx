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
])
 

  return <div className="app">
    <h1>Lista de Tarefas</h1>
    <div className="todo-list">
      {todos.map((todo)=>(
        <Todo  todo={todo}/>
      ))}
    </div>
    <TodoForm/>
  </div>
}

export default App
