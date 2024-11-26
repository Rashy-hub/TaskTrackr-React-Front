import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import fetchTodos from '../services/fetchTodos'
import Loader from './ux/Loader'
import TodoItem from './TodoItem'

function TodoList() {
    const { data, error, isLoading } = useQuery({
        queryFn: () => fetchTodos.getTodos(),
        queryKey: ['todos'],
    })

    const queryClient = useQueryClient()

    // Mutation for updating a todo
    const updateMutation = useMutation({
        mutationFn: fetchTodos.putTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        },
        onMutate: async (updatedTodo) => {
            // Optimistic update
            await queryClient.cancelQueries(['todos'])
            const previousTodos = queryClient.getQueryData(['todos'])
            console.log('ON MUTATE => PUT ')
            // optimistic cache
            queryClient.setQueryData(['todos'], (oldData) => {
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        todos: oldData.data.todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
                    },
                }
            })

            return { previousTodos }
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(['todos'], context.previousTodos)
            console.error('Update failed:', error)
        },
    })

    // Mutation for deleting a todo
    const deleteMutation = useMutation({
        mutationFn: fetchTodos.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        },
        onMutate: async (deletedTodoId) => {
            // Optimistic update for delete
            await queryClient.cancelQueries(['todos'])
            const previousTodos = queryClient.getQueryData(['todos'])
            queryClient.setQueryData(['todos'], (oldData) => {
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        todos: oldData.data.todos.filter((todo) => todo._id !== deletedTodoId),
                    },
                }
            })
            return { previousTodos }
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(['todos'], context.previousTodos)
            console.error('Delete failed:', error)
        },
    })

    const updateHandler = (todo) => {
        console.log(JSON.stringify(todo))
        updateMutation.mutate(todo)
    }

    const deleteHandler = (todoId) => {
        deleteMutation.mutate(todoId)
    }

    if (isLoading) return <Loader />
    if (error) return <div className="flex justify-center items-center text-4xl w-fit">An error occurred: {error.message}</div>

    if (!data.data?.todos || data.data.todos.length === 0)
        return <div className="flex justify-center items-center text-4xl w-fit">No todos found</div>

    return (
        <ul className="h-fit w-[600px] font-extrabold mt-4 text-amber-200 overflow-auto font-special text-2xl border-8 rounded-lg border-amber-500 ">
            {data.data.todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={() => deleteHandler(todo._id)}
                    onUpdate={(updatedText) => {
                        updateHandler({ ...todo, text: updatedText })
                    }}
                />
            ))}
        </ul>
    )
}

export default TodoList
