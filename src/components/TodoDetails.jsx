import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import fetchTodos from '../services/fetchTodos'
import Loader from './ux/Loader'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { todoSchema } from '../validators/todosValidator'
import FormInput from './TodoInput'
import ToggleInput from './ui/ToggleInput'

const TodoDetails = ({ id }) => {
    const navigate = useNavigate()
    const {
        data: details,
        error,
        isLoading,
    } = useQuery({
        queryFn: () => fetchTodos.getTodo({ id }),
        queryKey: ['details', id],
    })

    const methods = useForm({ resolver: yupResolver(todoSchema) })
    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = methods

    useEffect(() => {
        if (details) {
            //this way we avoid changing this part of code if todo data schema changes
            //=> particular case value completed is based on a boolean => DONE or IN PROGRESS
            Object.keys(details).forEach((key) => {
                setValue(key.toString(), details[key])
            })
        }
    }, [details, setValue])
    if (isLoading) return <Loader />
    if (error) {
        navigate(`/error/${error.message}`)
    }
    const onSubmit = (formData) => {
        console.log('Form Updated ' + formData)
    }

    return (
        <div className="container text-gray-300 text-lg font-medium leading-relaxed">
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-md mx-auto p-6 bg-transparent shadow-md rounded-lg border-neutral-100 border-[1px]"
                >
                    <FormInput label="Task Id" name="id" register={methods.register} errors={errors} placeholder="Enter Task ID" />
                    <FormInput
                        label="Task Description"
                        name="todo"
                        register={methods.register}
                        errors={errors}
                        placeholder="Enter Task Description"
                    />

                    <ToggleInput name="completed" />

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

TodoDetails.propTypes = {
    id: PropTypes.string.isRequired,
}

export default TodoDetails
