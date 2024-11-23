import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import fetchAuth from '../services/fetchAuth'
import Loader from '../components/ux/Loader'
import { useMutation } from '@tanstack/react-query'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { useTheme } from '../context/ThemeContext'
import FormInput from '../components/FormTextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { authRegisterSchema } from '../validators/authValidator'

const RegisterPage = () => {
    const { darkMode } = useTheme()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(authRegisterSchema) })

    const mutation = useMutation({
        mutationFn: fetchAuth.register,
        onSuccess: () => {
            navigate('/login')
        },
    })

    const onSubmit = (data) => {
        if (data.password !== data.confirmpass) {
            return alert('Passwords do not match')
        }

        mutation.mutate({
            username: data.username,
            email: data.email,
            password: data.password,
        })
    }

    if (mutation.isLoading) return <Loader />

    return (
        <>
            <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
                {' '}
                <Header title="TaskTrackr | Register" />
                <Main>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-style">
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        {mutation.error && (
                            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
                                {mutation.error.message || 'An error occurred during registration'}
                            </div>
                        )}

                        <FormInput label="User Name" name="username" register={register} errors={errors} placeholder="Enter your user name" />
                        <FormInput label="E-mail" name="email" register={register} errors={errors} placeholder="Enter your email" />
                        <FormInput label="Password" name="password" register={register} errors={errors} placeholder="Enter your password" />
                        <FormInput
                            label="Confirm Password"
                            name="confirmpass"
                            register={register}
                            errors={errors}
                            placeholder="confirm your password"
                        />

                        {errors.confirmpass && <p className="text-red-600 text-sm">{errors.confirmpass.message}</p>}

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
