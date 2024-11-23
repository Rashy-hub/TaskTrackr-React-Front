import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function TodoItem({ todo }) {
    return (
        <li className="p-1">
            <Link to={`/todos/${todo._id}`}>{todo.text}</Link>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
}

export default TodoItem
