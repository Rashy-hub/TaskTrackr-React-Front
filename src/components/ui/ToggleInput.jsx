import { useEffect, useState } from 'react'
import Switch from 'react-switch'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

const ToggleInput = ({ name }) => {
    const { setValue, watch } = useFormContext()
    const [checked, setChecked] = useState(false)

    const currentValue = watch(name, false)

    useEffect(() => {
        setChecked(currentValue)
    }, [currentValue])

    const handleChange = (nextChecked) => {
        setChecked(nextChecked)
        setValue(name, nextChecked)
    }

    return (
        <Switch
            onChange={handleChange}
            checked={checked}
            onColor="#86d3ff"
            offColor="#ffb6b9"
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={48}
        />
    )
}

ToggleInput.propTypes = {
    name: PropTypes.string.isRequired,
}

export default ToggleInput
