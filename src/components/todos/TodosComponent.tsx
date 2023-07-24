import { useState } from 'react'
import { type Todo as TodoType, type TodoId, type ListOfTodos } from '../../model/types'
import { TodoComponent } from './components/TodoComponent'

interface Props {
  todos: ListOfTodos
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
  setTitle: (params: { id: string, title: string }) => void
}

export const TodosComponent: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo, setTitle }) => {
  const [isEditing, setIsEditing] = useState('')

  return (
    <ul className="todo-list">
        { todos.map(todo =>
            <li key={todo.id}
                onDoubleClick={() => {setIsEditing(todo.id) }}
                className={`${todo.completed ? 'completed' : ''} ${isEditing === todo.id ? 'editing': ''}`}>
                <TodoComponent
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                onToggleCompleteTodo={onToggleCompleteTodo}
                onRemoveTodo={onRemoveTodo}
                setTitle={setTitle}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                />
            </li>
        )}
    </ul>
  )
}
