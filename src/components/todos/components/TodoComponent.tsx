import { useEffect, useRef, useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../../../model/types'

interface Props extends TodoType {
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onRemoveTodo: ({ id }: TodoId) => void
  setTitle: (params: { id: string, title: string }) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const TodoComponent: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo, setTitle, isEditing, setIsEditing }) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({
      id,
      completed: event.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '')
      onRemoveTodo({ id })
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleChangeCheckbox} />
        <label>{title}</label>
        <button
          className="destroy"
          onClick={() => {
            onRemoveTodo({ id })
          } }>
        </button>
      </div>
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) } }
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') } }
        ref={inputEditTitle}
      />
    </>
  )
}
