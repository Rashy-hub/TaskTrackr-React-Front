import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true) // Initialiser en dark mode par défaut

    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light'

        document.documentElement.setAttribute('data-theme', theme) // Appliquer le thème sur <html>
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode((mode) => !mode)
    }

    return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
