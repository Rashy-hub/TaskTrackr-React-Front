import Header from './layouts/Header'
import Main from './layouts/Main'
import TodoList from './components/TodoList'

function App() {
    return (
        <div className="body-bg">
            {' '}
            <Header title="TaskTrackr" />
            <Main>
                <TodoList />
            </Main>
        </div>
    )
}

export default App
