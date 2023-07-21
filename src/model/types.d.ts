import { type TODO_FILTERS } from '../config/todo-filters.config'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'> // Parámetros nombrados
export type TodoTitle = Pick<Todo, 'title'> // Parámetros nombrados
export type TodoCompleted = Pick<Todo, 'completed'> // Parámetros nombrados

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
