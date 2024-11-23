import { AiOutlinePlus } from 'react-icons/ai'
import { useMutation } from '@tanstack/react-query'
import fetchTodos from '../services/fetchTodos'

import FormInput from './FormTextInput'
import Loader from './ux/Loader'
import { useFormContext } from 'react-hook-form'

const TodoAddForm = () => {
    const methods = useFormContext()
    const { handleSubmit } = methods // retrieve all hook methods

    const mutation = useMutation({
        mutationFn: fetchTodos.postTodo,
        onSuccess: (data) => {
            alert('TODO ADDED ' + JSON.stringify(data))
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
            text: formData.text, // Valeur de l'input
            // status: 'IN PROGRESS', // Statut sélectionné (assurez-vous que ce champ est bien défini dans le formulaire)
        })
    }
    const onErrors = (formData) => {
        console.log('Soumission erreurs:', JSON.stringify(formData))
    }

    if (mutation.isLoading) return <Loader />

    return (
        <form
            className="form-style flex flex-row items-center"
            onSubmit={handleSubmit(onSubmit, onErrors)} // Soumettre avec React Hook Form
        >
            <FormInput name="text" placeholder="Add a new todo here ..." divstyle="mb-0" />

            {/* Le bouton stylisé avec TailwindCSS */}
            <button
                type="submit" // Cela déclenche la soumission du formulaire
                className="w-[50px]  h-10 bg-pink-500 text-white rounded-md flex justify-center items-center"
            >
                <AiOutlinePlus />
            </button>
        </form>
    )
}

export default TodoAddForm
