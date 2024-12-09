import Header from './layouts/Header'
import Main from './layouts/Main'

import { useTheme } from './context/ThemeContext'

import TopicsPage from './pages/TopicsPage'

function App() {
    const { darkMode } = useTheme()

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            {' '}
            <Header title="TaskTrackr" />
            <Main>
                <TopicsPage />
            </Main>
        </div>
    )
}

export default App
