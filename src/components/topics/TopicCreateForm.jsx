import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import fetchTopics from '../../services/fetchTopics'
import { useNavigate } from 'react-router-dom'

const TopicCreateForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const queryClient = useQueryClient()
    const navigation = useNavigate()
    const mutation = useMutation({
        mutationFn: fetchTopics.postTopic,
        onSuccess: (data) => {
            console.log(`Mutation postTopic : on Succes ${data}`)
            queryClient.invalidateQueries(['topics'])
            navigation('/app/topics')
            reset()
        },
        onMutate: (data) => {
            console.log(`Mutation postTopic : on Mutate ${data}`)
        },
        onError: (error) => {
            console.log(`Mutation postTopic : on Error ${error}`)
        },
    })

    const onSubmit = (data) => {
        console.log('Form Data:', data)
        mutation.mutate({ ...data })

        reset() // Reset form after submission
    }

    return (
        <div className="w-[640px] mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-special mb-4 text-neutral-900 text-center">Create a New Topic</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title Field */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', {
                            required: 'Title is required',
                            maxLength: {
                                value: 50,
                                message: 'Title cannot exceed 50 characters',
                            },
                        })}
                        className={`mt-1 block w-full rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  font-special text-neutral-900 p-1${
                            errors.title ? 'border-red-500' : ''
                        }`}
                    />

                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description', {
                            required: 'Description is required',
                            maxLength: {
                                value: 200,
                                message: 'Description cannot exceed 200 characters',
                            },
                        })}
                        className={`mt-1 block w-full rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-special text-neutral-900 p-1 ${
                            errors.description ? 'border-red-500' : ''
                        }`}
                        rows={4}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Color Field */}
                <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="color"
                        {...register('category', { required: 'Please select a color' })}
                        className={`mt-1 block w-full rounded-md border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-special text-neutral-900 p-1 ${
                            errors.color ? 'border-red-500' : ''
                        }`}
                    >
                        <option value="">Select a category</option>
                        <option value="INTERPERSONAL">Blue - Interpersonal </option>
                        <option value="LEARNING">Green - Learning</option>
                        <option value="REVIEW">Red - Review </option>
                        <option value="CHORES">Yellow - Chores</option>
                        <option value="SPORTS">Purple - Sports</option>
                        <option value="WORK">Orange - Work</option>
                        <option value="SOCIAL DUTIES">Pink - Social Duties</option>
                    </select>
                    {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
                    >
                        Create Topic
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TopicCreateForm
