import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function TodoItem({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false) // Toggle edit mode
    const [newText, setNewText] = useState(todo.text)

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        if (newText.trim() && newText !== todo.text) {
            onUpdate(newText)
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setNewText(todo.text)
        setIsEditing(false)
    }

    return (
        <li className="flex items-center justify-between p-2 border-b border-gray-300">
            {/* Todo Text or Input Field */}
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="flex-grow bg-transparent text-lg focus:outline-none border-b border-gray-400"
                    autoFocus
                />
            ) : (
                <Link to={`/todos/${todo._id}`} className="text-lg text-green-700 hover:underline">
                    {todo.text}
                </Link>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        {/* Save Button */}
                        <button onClick={handleSave} className="p-1 transition hover:bg-green-200 rounded">
                            <img src="/check.svg" alt="Save Todo" className="w-5 h-5" />
                        </button>
                        {/* Cancel Button */}
                        <button onClick={handleCancel} className="p-1 transition hover:bg-gray-200 rounded">
                            <img src="/cancel.svg" alt="Cancel Edit" className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <>
                        {/* Edit Button */}
                        <button onClick={handleEditClick} className="p-1 transition hover:bg-gray-200 rounded">
                            <img src="/pen.svg" alt="Edit Todo" className="w-5 h-5" />
                        </button>

                        {/* Delete Button */}
                        <button onClick={() => onDelete(todo._id)} className="p-1 transition hover:bg-red-100 rounded">
                            <img src="/trash.svg" alt="Delete Todo" className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default TodoItem
