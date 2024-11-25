import { useEffect, useState } from 'react'
import HeaderHome from '../components/home/HeaderHome'
import Hero from '../components/home/Hero'
import { useTheme } from '../context/ThemeContext'
import HomeMain from '../layouts/HomeMain'
import Features from '../components/home/Features'

const HomePage = () => {
    const { darkMode } = useTheme()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 25
            })
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            <HeaderHome />

            <HomeMain>
                <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                    <div
                        className={`w-[1px] absolute top-0 left-0 h-full transition-all duration-200 ease-in-out ${
                            darkMode ? 'bg-[#4cb04f]' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <Hero />
                <Features />
            </HomeMain>
        </div>
    )
}

export default HomePage
