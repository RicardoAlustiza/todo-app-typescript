import { type FilterValue } from '../../model/types'
import { FiltersComponent } from './components/FiltersComponent'

interface Props {
  activeCount: number
  completedCount: number
  filtersSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}
export const FooterComponent: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filtersSelected,
  onClearCompleted,
  handleFilterChange
}) => {
  return (
    <footer className="footer">
        <span className="todo-count">
            <strong>{activeCount}</strong> Tareas pendientes
        </span>

        <FiltersComponent
            filtersSelected={filtersSelected}
            onFilterChange={handleFilterChange}
        />
        {
          completedCount > 0 && (
            <button
              className="clear-completed"
              onClick={onClearCompleted}
            >
              Borrar completados
            </button>
          )
        }
    </footer>
  )
}
