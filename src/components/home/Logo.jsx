import { useNavigate } from 'react-router-dom'

const Logo = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-2 w-[50px] h-[50px] cursor-pointer">
            <img onClick={() => navigate('/')} src="/home.svg" className="w-full h-full"></img>
            <div className="text-lg font-bold font-special">TaskTrackr</div>
        </div>
    )
}

export default Logo
