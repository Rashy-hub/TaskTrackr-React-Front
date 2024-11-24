import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetchTodos from '../services/fetchTodos'
import Loader from './ux/Loader'
import { useFormContext } from 'react-hook-form'
import { useRef } from 'react'

const TodoAddForm = () => {
    const methods = useFormContext()
    const queryClient = useQueryClient()
    const { handleSubmit, reset, register } = methods // retrieve all hook methods
    const inputRef = useRef(null)
    const mutation = useMutation({
        mutationFn: fetchTodos.postTodo,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['todos'])
            console.log(JSON.stringify(data))

            reset()
            if (inputRef.current) {
                inputRef.current.focus()
            }
        },
        onMutate: (data) => {
            console.log('MUTATING WITH ' + JSON.stringify(data.text))
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (formData) => {
        console.log('Soumission des données:', formData.text)
        mutation.mutate({
            text: formData.text,
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
                <img
                    src="/add.svg" // Chemin relatif depuis le dossier public
                    alt="Add icon"
                    className="w-6 h-6" // Ajustez la taille selon vos besoins
                />
            </button>
        </form>
    )
}

export default TodoAddForm
