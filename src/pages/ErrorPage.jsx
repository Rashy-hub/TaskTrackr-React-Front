import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { FaArrowLeft } from 'react-icons/fa'

const ErrorPage = () => {
    const navigate = useNavigate()
    const { message } = useParams()
    return (
        <>
            <div className="body-bg">
                {' '}
                <Header title="TaskTrackr | Error" />
                <Main>
                    <h2 className="text-4xl text-amber-300 font-extrabold m-4">SOMETHING WENT WRONG</h2>
                    <p>{message ? `${message}` : ' path does not exist'}</p>
                    <Button onClick={() => navigate('/')} icon={<FaArrowLeft />}>
                        Go back
                    </Button>
                </Main>
            </div>
        </>
    )
}

export default ErrorPage
