import { FILTER_BUTTONS } from '../../../config/todo-filters.config'
import { type FilterValue } from '../../../model/types'

interface Props {
  filtersSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export const FiltersComponent: React.FC<Props> = ({ filtersSelected, onFilterChange }) => {
  return (
    <ul className="filters">
        {
        Object.entries(FILTER_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filtersSelected
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
                <a
                    href={href}
                    className={className}
                    onClick={(event) => {
                      event.preventDefault()
                      onFilterChange(key as FilterValue)
                    }}
                >
                  {literal}
                </a>
            </li>
          )
        })
        }
        <li>

        </li>
    </ul>
  )
}
