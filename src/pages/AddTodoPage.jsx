import TodoForm from '../components/TodoForm'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

function AddTodoPage() {
    return (
        <>
            <div className="body-bg">
                {' '}
                <Header title="Add Todo form" />
                <Main>
                    <TodoForm />
                </Main>
            </div>
        </>
    )
}

export default AddTodoPage
