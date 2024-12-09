import Header from '../layouts/Header'
import Main from '../layouts/Main'

import { useTheme } from '../context/ThemeContext'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { todoSchema } from '../validators/todosValidator'

import TodoAddForm from '../components/TodoAddForm'
import TodoTable from '../components/TodoTable'
import { useParams } from 'react-router-dom'

function TodoPage() {
    const { darkMode } = useTheme()

    const { topicId } = useParams() // Extract the id from the URL
    const methods = useForm({ resolver: yupResolver(todoSchema) })

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            {' '}
            <Header title="TaskTrackr" />
            <Main>
                <FormProvider {...methods}>
                    <TodoAddForm topicId={topicId} />
                    {/* <TodoList /> */}
                    <TodoTable topicId={topicId} />
                </FormProvider>
            </Main>
        </div>
    )
}

export default TodoPage
