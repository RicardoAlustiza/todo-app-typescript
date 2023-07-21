import { useState } from 'react'
import { TodosComponent } from './components/todos/TodosComponent'
import './index.css'
import { type Todo as TodoType, type TodoId, type FilterValue, type TodoTitle } from './model/types'
import { TODO_FILTERS } from './config/todo-filters.config'
import { FooterComponent } from './components/footer/FooterComponent'
import { HeaderComponent } from './components/header/headerComponent'

const mockTodos = [
  {
    id: '1',
    title: 'Todo 1',
    completed: true
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: false
  },
  {
    id: '3',
    title: 'Todo 3',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <HeaderComponent
        onAddTodo={handleAddTodo}
      />
      <TodosComponent
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <FooterComponent
        activeCount={activeCount}
        completedCount={completedCount}
        filtersSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
