import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import fetchTodos from '../services/fetchTodos'
import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoTable() {
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
            await queryClient.cancelQueries(['todos'])
            const previousTodos = queryClient.getQueryData(['todos'])

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
        updateMutation.mutate(todo)
    }

    const deleteHandler = (todoId) => {
        deleteMutation.mutate(todoId)
    }

    // States to manage visibility of columns
    const [showCreationDate, setShowCreationDate] = useState(false)
    const [showEndDate, setShowEndDate] = useState(false)

    // Defining columns for the table
    const columns = [
        {
            header: 'Task',
            accessorKey: 'text',
            cell: ({ row }) => (
                <TodoItem
                    key={row.original._id}
                    todo={row.original}
                    onUpdate={(updatedText) => {
                        updateHandler({ ...row.original, text: updatedText })
                    }}
                />
            ),
        },
        {
            header: 'Creation Date',
            accessorKey: 'createdAt',
            cell: ({ getValue }) => {
                const date = new Date(getValue())
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            },
            // Only display this column if showCreationDate is true
            isVisible: showCreationDate,
        },
        {
            header: 'End Date',
            accessorKey: 'endDate',
            cell: ({ row }) => (
                <input
                    className="bg-transparent"
                    type="date"
                    defaultValue={row.original.endDate}
                    onChange={(e) => updateHandler({ ...row.original, endDate: e.target.value })}
                />
            ),
            // Only display this column if showEndDate is true
            isVisible: showEndDate,
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => (
                <select
                    className="bg-transparent text-neutral-100"
                    defaultValue={row.original.status}
                    onChange={(e) => updateHandler({ ...row.original, status: e.target.value })}
                >
                    <option value="IN_PROGRESS" className="text-neutral-900">
                        In Progress
                    </option>
                    <option value="DONE" className="text-neutral-900">
                        Done
                    </option>
                    <option value="STANDBY" className="text-neutral-900">
                        Standby
                    </option>
                </select>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <>
                    <button className="text-red-500 ml-2" onClick={() => deleteHandler(row.original._id)}>
                        Delete
                    </button>
                </>
            ),
        },
    ]

    // Table instance with conditional columns
    const table = useReactTable({
        data: data?.data?.todos || [],
        columns: columns.filter((col) => col.isVisible !== false), // Filter columns based on visibility state
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <>
            {/* Checkboxes to toggle column visibility */}
            <div className="flex mb-4">
                <label className="mr-4">
                    <input type="checkbox" checked={showCreationDate} onChange={() => setShowCreationDate(!showCreationDate)} />
                    Show Creation Date
                </label>
                <label>
                    <input type="checkbox" checked={showEndDate} onChange={() => setShowEndDate(!showEndDate)} />
                    Show End Date
                </label>
            </div>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-700 bg-gray-900 text-gray-200 font-special">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-800">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 border border-gray-700 text-left font-semibold text-gray-300">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-200`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border border-gray-700 text-gray-300">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

TodoTable.propTypes = {
    data: PropTypes.shape({
        data: PropTypes.shape({
            todos: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                    creationDate: PropTypes.string,
                    endDate: PropTypes.string,
                    status: PropTypes.oneOf(['IN_PROGRESS', 'DONE', 'STANDBY']),
                })
            ),
        }),
    }),
    error: PropTypes.object,
    isLoading: PropTypes.bool,
}

export default TodoTable
