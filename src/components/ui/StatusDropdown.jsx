import PropTypes from 'prop-types'
import { useState } from 'react'

const StatusDropdown = ({ onChange, register, name, errors }) => {
    const [selectedStatus, setSelectedStatus] = useState('IN PROGRESS')

    const statuses = ['DONE', 'IN PROGRESS', 'STANDBY', 'REPORTED']

    const handleChange = (e) => {
        const newStatus = e.target.value
        setSelectedStatus(newStatus)

        if (onChange) {
            onChange(newStatus)
        }
    }

    return (
        <div className="w-64">
            <label htmlFor="status-dropdown" className="block text-sm font-medium text-gray-700 mb-2 ">
                Status
            </label>
            <select
                id="status-dropdown"
                value={selectedStatus}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-neutral-900"
                {...register(name)}
            >
                {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]?.message}</p>}
        </div>
    )
}

StatusDropdown.propTypes = {
    onChange: PropTypes.func,
    register: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object,
}

export default StatusDropdown
