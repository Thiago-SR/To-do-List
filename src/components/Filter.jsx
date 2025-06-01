import React from 'react'

const Filter = ({filter, setFilter, sort, setSort}) => {
  return (
    <div className="filter">
        <h2>Filtrar:</h2>
        <div className="filter-options">
            <div>
                <p>Status:</p>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="completed">Completos</option>
                    <option value="incompleted">Incompletos</option>
                </select>
            </div>
            <div>
                <p>Ordem Alfabética:</p>
                <button onClick={() => setSort('asc')}>A-Z</button>
                <button onClick={() => setSort('desc')}>Z-A</button>
            </div>
        </div>
    </div>
)
}

export default Filter