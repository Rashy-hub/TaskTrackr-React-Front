import PropTypes from 'prop-types'
import SignButton from '../components/ui/SignButton'
import { useAuth } from '../context/AuthContext'

const Header = ({ title }) => {
    const { isAuthenticated } = useAuth()

    return (
        <header className="w-screen flex justify-between h-20 bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 text-center mx-auto sticky top-0">
            <h1 className="text-4xl font-bold">{title}</h1>

            <div className="flex gap-4 mr-4">
                {isAuthenticated ? (
                    <SignButton name="Logout" variant="logout" />
                ) : (
                    <>
                        <SignButton name="Login" variant="login" />
                        <SignButton name="Register" variant="register" />
                    </>
                )}
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
