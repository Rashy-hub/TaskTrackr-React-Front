import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Button from '../components/ui/Button'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

import { useTheme } from '../context/ThemeContext'
import TopicCreateForm from '../components/topics/TopicCreateForm'

function CreateTopicPage() {
    const navigate = useNavigate()
    const { darkMode } = useTheme()
    return (
        <>
            <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
                {' '}
                <Header title="Topic creation" />
                <Main>
                    <p>Create topic page</p>
                    <TopicCreateForm />
                    <Button onClick={() => navigate(-1)} icon={<FaArrowLeft />}>
                        Go Back
                    </Button>
                </Main>
            </div>
        </>
    )
}

export default CreateTopicPage
