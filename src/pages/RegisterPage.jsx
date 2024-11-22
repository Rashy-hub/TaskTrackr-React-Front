import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import fetchAuth from '../services/fetchAuth'
import Loader from '../components/ux/Loader'
import { useMutation } from '@tanstack/react-query'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: fetchAuth.register,
        onSuccess: () => {
            navigate('/login')
        },
    })

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Passwords do not match')
        }

        mutation.mutate({
            username: data.name,
            email: data.email,
            password: data.password,
        })
    }

    if (mutation.isLoading) return <Loader />

    return (
        <>
            <div className="body-bg">
                {' '}
                <Header title="TaskTrackr | Register" />
                <Main>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Register</h2>
                        {mutation.error && (
                            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
                                {mutation.error.message || 'An error occurred during registration'}
                            </div>
                        )}

                        {/* Name Input */}
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                        {/* Password Input */}
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                        {/* Confirm Password Input */}
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === watch('password') || 'Passwords do not match',
                            })}
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />
                        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}

                        <button type="submit" className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition">
                            Register
                        </button>
                        <p className="mt-4 text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Log in
                            </a>
                        </p>
                    </form>
                </Main>
            </div>
        </>
    )
}

export default RegisterPage
