import PropTypes from 'prop-types'

const FormInput = ({ label, name, register, errors, placeholder }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-amber-300 mb-1">
            {label}
        </label>
        <input
            type="text"
            {...register(name)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-900"
            placeholder={placeholder}
        />
        {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
)

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    placeholder: PropTypes.string,
}

export default FormInput
