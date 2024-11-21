import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function TodoItem({ todo }) {
    return (
        <li className="p-1">
            <Link to={`/todos/${todo.id}`}>{todo.todo}</Link>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        todo: PropTypes.string.isRequired,
    }).isRequired,
}

export default TodoItem
