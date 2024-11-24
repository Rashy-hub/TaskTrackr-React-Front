import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light'

        document.documentElement.setAttribute('data-theme', theme)
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode((mode) => !mode)
    }

    return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
