import PropTypes from 'prop-types'
import SignButton from '../components/ui/SignButton'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { useTheme } from '../context/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'
import Logo from '../components/home/Logo'
const Header = ({ title }) => {
    const { isAuthenticated, islogin } = useAuth()
    const { darkMode, toggleTheme } = useTheme()

    const handleThemeToggle = () => {
        toggleTheme()
    }

    return (
        <>
            <header
                className="w-screen flex justify-between h-20 bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 text-center mx-auto sticky top-0"
                data-theme={darkMode ? 'dark' : 'light'}
            >
                <div className="flex w-[50%] justify-between ml-2 items-center">
                    {/* <button ></button> */}

                    <Logo />
                    <h1 className="text-4xl font-bold font-special ">{title}</h1>
                </div>

                <div className="flex gap-4 mr-4">
                    {isAuthenticated ? (
                        <SignButton name="Logout" variant="logout" />
                    ) : (
                        <>
                            <SignButton name="Login" variant="login" />
                            <SignButton name="Register" variant="register" />
                        </>
                    )}
                    <Button onClick={handleThemeToggle} icon={darkMode ? <FaSun /> : <FaMoon />}></Button>
                </div>
            </header>

            {islogin && (
                <div className="w-screen h-[4px] bg-neutral-700">
                    <div className="progress-bar h-full bg-blue-500 animate-progress-bar"></div>
                </div>
            )}
        </>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
