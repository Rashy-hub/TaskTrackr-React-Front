import { useQuery } from '@tanstack/react-query'
import fetchTodos from '../services/fetchTodos'
import Loader from './ux/Loader'
import TodoItem from './TodoItem'

function TodoList() {
    const { data, error, isLoading } = useQuery({
        queryFn: () => fetchTodos.getTodos(),
        queryKey: ['todos'],
    })

    if (isLoading) return <Loader />
    if (error) return <div className="flex justify-center items-center text-4xl w-fit">An error occurred: {error.message}</div>

    if (!data.data?.todos || data.data.todos.length === 0)
        return <div className="flex justify-center items-center text-4xl w-fit">No todos found</div>

    return (
        <ul className="h-fit w-[600px] font-extrabold mt-4 text-amber-200 overflow-auto font-special text-2xl border-2 border-amber-500 ">
            {data.data.todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </ul>
    )
}

export default TodoList
