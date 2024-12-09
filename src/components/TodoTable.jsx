import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table'
import fetchTodos from '../services/fetchTodos'
import { useState } from 'react'
import TodoItem from './TodoItem'
import PomodoroModal from './PomodoroModal'

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
            console.log('This is the todo updated ' + JSON.stringify(updatedTodo, null, 2))
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

    const archiveHandler = (todo) => {
        console.log('Archiving with this todo ' + todo)
        updateMutation.mutate({ ...todo, isArchived: true })
    }
    //Modal pomodoro timer
    const [modalIsOpen, setIsOpen] = useState(false)
    const [currentTaskName, setCurrentTaskName] = useState({})

    const pomodoroHandler = (taskName) => {
        setCurrentTaskName(taskName)
        setIsOpen(true)
    }
    const closeModalHandler = () => {
        setCurrentTaskName({})
        setIsOpen(false)
    }

    // States to manage visibility of columns and sort
    const [showCreationDate, setShowCreationDate] = useState(false)
    const [showPriority, setShowPriority] = useState(false)
    const [showArchived, setShowArchived] = useState(false)
    const [sorting, setSorting] = useState([])

    const columns = [
        {
            header: 'Task',
            sortDescFirst: false,
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
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })
                return `${formattedDate} at ${formattedTime}`
            },

            isVisible: showCreationDate,
        },
        {
            header: 'Priority',
            accessorKey: 'priority',
            cell: ({ row }) => (
                <select
                    id={`priority-${row.original._id}`}
                    name="priority"
                    className="bg-transparent text-neutral-100"
                    defaultValue={row.original.priority}
                    onChange={(e) => updateHandler({ ...row.original, priority: e.target.value })}
                >
                    <option value="CRUCIAL" className="text-neutral-900">
                        Crucial
                    </option>
                    <option value="IMPORTANT" className="text-neutral-900">
                        Important
                    </option>
                    <option value="NORMAL" className="text-neutral-900">
                        Normal
                    </option>
                    <option value="LOW" className="text-neutral-900">
                        Low
                    </option>
                </select>
            ),

            isVisible: showPriority,
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => (
                <select
                    id={`status-${row.original._id}`}
                    name="status"
                    className="bg-transparent text-neutral-100"
                    defaultValue={row.original.status}
                    onChange={(e) => updateHandler({ ...row.original, status: e.target.value })}
                >
                    <option value="IN PROGRESS" className="text-neutral-900">
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
                        Delete 🗑️
                    </button>
                    <button
                        className={`ml-2 px-4 py-2 font-semibold rounded ${
                            row.original.status === 'DONE' ? 'text-gray-400 line-through cursor-not-allowed' : 'text-green-500 hover:text-green-600'
                        }`}
                        onClick={() => pomodoroHandler(row.original)}
                        disabled={row.original.status === 'DONE'}
                    >
                        Pomodoro ⏰
                    </button>
                    <button className="text-amber-500 ml-2" onClick={() => archiveHandler(row.original)}>
                        Archive 🗃️
                    </button>
                </>
            ),
        },
    ]

    // Table instance with conditional columns
    const table = useReactTable({
        data: data?.data?.todos || [],
        columns: columns.filter((col) => col.isVisible !== false),
        getCoreRowModel: getCoreRowModel(),

        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting,

        state: {
            sorting,
        },
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <>
            {/*Pomodoro Modal component */}
            <PomodoroModal modalIsOpen={modalIsOpen} closeModal={closeModalHandler} task={currentTaskName} />
            {/* Checkboxes to toggle column visibility */}
            <div className="flex mb-4">
                <label htmlFor="checkCreationDate" className="mr-4 font-special">
                    <input
                        id="checkCreationDate"
                        name="checkCreationDate"
                        className="mr-2"
                        type="checkbox"
                        checked={showCreationDate}
                        onChange={() => setShowCreationDate(!showCreationDate)}
                    />
                    Show Creation Date
                </label>
                <label htmlFor="checkPriority" className="font-special">
                    <input
                        id="checkPriority"
                        name="checkPriority"
                        className="mr-2"
                        type="checkbox"
                        checked={showPriority}
                        onChange={() => setShowPriority(!showPriority)}
                    />
                    Show Priorities
                </label>
                <label>
                    <input
                        id="checkArchived"
                        name="checkArchived"
                        className="ml-2 mr-2"
                        type="checkbox"
                        checked={showArchived}
                        onChange={() => setShowArchived(!showArchived)}
                    />
                    Show Archived
                </label>
            </div>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-700 bg-gray-900 text-gray-200 font-special">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-800">
                            {headerGroup.headers.map((header) => (
                                /*  <th key={header.id} className="px-4 py-2 border border-gray-700 text-left font-semibold text-gray-300">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th> */
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="px-4 py-2 border border-gray-700 text-left font-semibold text-gray-300"
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                            onClick={header.column.getToggleSortingHandler()}
                                            title={
                                                header.column.getCanSort()
                                                    ? header.column.getNextSortingOrder() === 'asc'
                                                        ? 'Sort ascending'
                                                        : header.column.getNextSortingOrder() === 'desc'
                                                        ? 'Sort descending'
                                                        : 'Clear sort'
                                                    : undefined
                                            }
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                    )}
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
