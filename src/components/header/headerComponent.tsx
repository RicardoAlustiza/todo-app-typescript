import { type TodoTitle } from '../../model/types'
import { CreateTodoComponent } from './createTodoComponent/createTodoComponent'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const HeaderComponent: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className="header">
        <h1>
            TODO
            <img style={{ width: '60px', height: 'auto' }}
            src=""/>
        </h1>

        <CreateTodoComponent saveTodo={onAddTodo} />
    </header>
  )
}
