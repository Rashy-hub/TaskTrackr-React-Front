import HeaderHome from '../components/home/HeaderHome'
import Hero from '../components/home/Hero'
import { useTheme } from '../context/ThemeContext'
import HomeMain from '../layouts/HomeMain'

const HomePage = () => {
    const { darkMode } = useTheme()

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            <HeaderHome />

            <HomeMain>
                {' '}
                <Hero />
            </HomeMain>
        </div>
    )
}

export default HomePage
