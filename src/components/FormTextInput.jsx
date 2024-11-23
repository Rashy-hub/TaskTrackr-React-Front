import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

const FormInput = ({ label, name, placeholder, divstyle }) => {
    if (!divstyle) divstyle = `mb-4` //default value
    const methods = useFormContext()
    const { register, formState: errors } = methods // retrieve all hook methods
    return (
        <div className={divstyle}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-amber-300 mb-1">
                    {label}
                </label>
            )}
            <input
                type="text"
                {...register(name)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-900"
                placeholder={placeholder}
            />
            {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]?.message}</p>}
        </div>
    )
}
FormInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    divstyle: PropTypes.string,
}

export default FormInput
