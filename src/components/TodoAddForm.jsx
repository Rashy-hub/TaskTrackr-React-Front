import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetchTodos from '../services/fetchTodos'
import Loader from './ux/Loader'
import { useFormContext } from 'react-hook-form'
import { useRef } from 'react'

import PropTypes from 'prop-types'

const TodoAddForm = ({ topicId }) => {
    const methods = useFormContext()
    console.log('RECEIVEING TOTOTABLE PROP : ' + topicId)

    const queryClient = useQueryClient()
    const { handleSubmit, reset, register } = methods // retrieve all hook methods
    const inputRef = useRef(null)
    const mutation = useMutation({
        mutationFn: fetchTodos.postTodo,
        onSuccess: (data) => {
            console.log(`Mutation postTodo : on Succes ${data}`)
            queryClient.invalidateQueries(['todos'])

            reset()
            if (inputRef.current) {
                inputRef.current.focus()
            }
        },
        onMutate: (data) => {
            console.log(`Mutation postTodo : on Mutate ${data}`)
        },
        onError: (error) => {
            console.log(`Mutation postTodo : on Error ${error}`)
        },
    })

    const onSubmit = (formData) => {
        mutation.mutate({
            text: formData.text,
            topicId,
        })
    }
    const onErrors = (formData) => {
        console.log('Soumission erreurs:', JSON.stringify(formData))
    }

    if (mutation.isLoading) return <Loader />

    return (
        <form className="form-style flex flex-row items-center" onSubmit={handleSubmit(onSubmit, onErrors)}>
            {/* <FormInput name="text" placeholder="Add a new todo here ..." divstyle="mb-0 rounded-r-none" /> */}
            <input
                ref={inputRef}
                name="text"
                placeholder="Add a new todo here ... "
                className="mb-0 rounded-r-none w-full h-10 px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-amber-200 focus:outline-none bg-white  text-neutral-950 font-special text-2xl"
                {...register('text')}
            />

            <button
                type="submit"
                className="w-[50px] ml-[1px] h-10  border-l-white bg-pink-500 text-white rounded-md flex justify-center items-center border-l-0 rounded-l-none"
            >
                <img src="/add.svg" alt="Add icon" className="w-6 h-6" />
            </button>
        </form>
    )
}

TodoAddForm.propTypes = {
    topicId: PropTypes.string.isRequired,
}

export default TodoAddForm
