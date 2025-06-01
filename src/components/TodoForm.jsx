import { useState } from 'react'

const TodoForm = ({addTodo}) => {
  const [value,setValue] = useState('');
  const [category,setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value || !category)return;
    addTodo(value,category);
    setValue('');
    setCategory('');
  }
  return (
    <div className='todo-form'>
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit}>
          <input type="text"
          placeholder='Digite a tarefa'
          onChange={(e) => setValue(e.target.value)}
          value={value}/>
          <select onChange={(e) => setCategory(e.target.value)}
            value={category}>
            <option value="">Selecione uma categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudo">Estudo</option>
            <option value="Pessoal">Pessoal</option>
          </select>
          <button className='btn-add' type='submit'>Criar</button>
      </form>
    </div>
  )
}

export default TodoForm