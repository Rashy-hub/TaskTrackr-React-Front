import { useTheme } from '../context/ThemeContext'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

const HomePage = () => {
    const { darkMode } = useTheme()
    return (
        // Utilisation dynamique de `data-theme` sur le div
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            <Header title="TaskTrackr | Home" />
            <Main></Main>
        </div>
    )
}

export default HomePage
