import Header from './layouts/Header'
import Main from './layouts/Main'
import TodoList from './components/TodoList'

import { useTheme } from './context/ThemeContext'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { todoSchema } from './validators/todosValidator'

import TodoAddForm from './components/TodoAddForm'

function App() {
    const { darkMode } = useTheme()
    const methods = useForm({ resolver: yupResolver(todoSchema) })

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            {' '}
            <Header title="TaskTrackr" />
            <Main>
                <FormProvider {...methods}>
                    <TodoAddForm />
                    <TodoList />
                </FormProvider>
            </Main>
        </div>
    )
}

export default App
