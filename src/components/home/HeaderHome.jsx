import Logo from './Logo'
import NavBar from './NavBar'

const HeaderHome = () => {
    return (
        <header className="w-screen flex justify-between h-20 bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 text-center mx-auto sticky top-0">
            <Logo />
            <NavBar />
        </header>
    )
}

export default HeaderHome
