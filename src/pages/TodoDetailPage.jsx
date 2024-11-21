import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Button from '../components/ui/Button'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

import TodoDetails from '../components/TodoDetails'

function TodoDetailPage() {
    const { todoId } = useParams()

    const navigate = useNavigate()

    return (
        <>
            <div className="body-bg">
                {' '}
                <Header title="Todo Details" />
                <Main>
                    <TodoDetails id={todoId} />
                    <Button onClick={() => navigate(-1)} icon={<FaArrowLeft />}>
                        Go Back
                    </Button>
                </Main>
            </div>
        </>
    )
}

export default TodoDetailPage
